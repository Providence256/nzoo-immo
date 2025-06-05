using API.DTOs.BookingDto;
using Core.Entities;
using Core.Interfaces;
using Stripe;

namespace API.Services;

public class PaymentService(IBookingRepository bookingRepo,
    IBookingService bookingService,
    IConfiguration config
    ) : IPaymentService
{
    public async Task<PaymentIntentResponse> CreatePaymentIntentAsync(BookingWithPaymentRequest request, int userId)
    {

        StripeConfiguration.ApiKey = config["StripeSettings:SecretKey"];

        var availabilitiCheck = await bookingService.CheckAvailabilityAsync(new AvailabilityCheckRequest
        {
            ListingId = request.ListingId,
            CheckInDate = request.CheckInDate,
            CheckOutDate = request.CheckOutDate,
            Adults = request.Adults,
            Children = request.Children,
            Babies = request.Babies,

        });

        if (!availabilitiCheck.IsAvailable)
        {
            throw new InvalidOperationException("Listing is not available for the selected dates.");
        }

        try
        {

            var paymentIntentOptions = new PaymentIntentCreateOptions
            {
                Amount = (long)(availabilitiCheck.TotalPrice * 100), // Convert to cents
                Currency = availabilitiCheck.Currency.ToLowerInvariant(),
                Confirm = false,
                AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                {
                    Enabled = true,
                },
                Metadata = new Dictionary<string, string>
                {
                    { "listingId", request.ListingId.ToString() },
                    { "userId", userId.ToString() },
                    { "checkInDate", request.CheckInDate.ToString("yyyy-MM-dd") },
                    { "checkOutDate", request.CheckOutDate.ToString("yyyy-MM-dd") },
                    { "adults", request.Adults.ToString() },
                    { "children", request.Children.ToString() },
                    { "babies", request.Babies.ToString() }
                },
                Description = $"Payment for Listing {request.ListingId}",
                ReceiptEmail = request.CustomerEmail,

            };

            var paymentIntentService = new PaymentIntentService();
            var paymentIntent = await paymentIntentService.CreateAsync(paymentIntentOptions);




            var response = new PaymentIntentResponse
            {
                TotalPrice = availabilitiCheck.TotalPrice,
                Currency = availabilitiCheck.Currency,
                PaymentIntentId = paymentIntent.Id,
                ClientSecret = paymentIntent.ClientSecret,
                RequiresAction = paymentIntent.Status == "requires_action",
            };

            return response;

        }
        catch (StripeException ex)
        {

            throw new InvalidOperationException("Payment failed: " + ex.Message, ex);
        }

    }

    public async Task<BookingWithPaymentResponse> SaveBookingAndConfirmPaymentAsync(BookingWithPaymentRequest request, int userId)
    {
        StripeConfiguration.ApiKey = config["StripeSettings:SecretKey"];

        try
        {
            var paymentIntentService = new PaymentIntentService();
            var paymentIntent = await paymentIntentService.GetAsync(request.paymentIntentId);


            var booking = await bookingService.CreateBooking(request, userId);

            if (paymentIntent.Status == "requires_confirmation")
            {
                var confirmedPaymentIntent = await paymentIntentService.ConfirmAsync(request.paymentIntentId);
                booking.PaymentStatus = MapStripeStatusToPaymentStatus(confirmedPaymentIntent.Status);
                booking.PaymentIntentId = paymentIntent.Id;
                await bookingRepo.UpdateAsync(booking);
            }

            var response = new BookingWithPaymentResponse
            {
                BookingId = booking.Id,
                ListingId = booking.ListingId,
                UserId = booking.UserId,
                TotalPrice = booking.TotalPrice,
                Currency = booking.Devise,
                CheckInDate = booking.CheckInDate,
                CheckOutDate = booking.CheckOutDate,
                Adults = booking.Guests.Adults,
                Children = booking.Guests.Children,
                Babies = booking.Guests.Babies,
                PaymentIntentId = paymentIntent.Id,
                PaymentStatus = booking.PaymentStatus,
                Status = booking.Status,
                RequiresAction = paymentIntent.Status == "requires_action",
                Nights = booking.Nights,
            };

            return response;
        }
        catch (StripeException ex)
        {

            throw new InvalidOperationException("Payment Confirmation failed: " + ex.Message, ex);
        }
    }

    public async Task<PaymentConfirmationResponse> ConfirmPaymentFromFront(string paymentIntentId)
    {
        try
        {
            var paymentIntentService = new PaymentIntentService();
            var paymentIntent = await paymentIntentService.GetAsync(paymentIntentId);

            if (paymentIntent.Metadata.TryGetValue("bookingId", out var bookingStr) &&
             int.TryParse(bookingStr, out var bookingId))
            {
                await UpdateBookingPaymentStatus(bookingId, paymentIntent);

                var booking = await bookingRepo.GetBookingByIdWithDetailsAsync(bookingId);

                return new PaymentConfirmationResponse
                {
                    Success = paymentIntent.Status == "succeeded",
                    PaymentStatus = MapStripeStatusToPaymentStatus(paymentIntent.Status),
                    BookingStatus = booking?.Status ?? BookingStatus.Cancelled,
                    BookingId = bookingId,
                    PaymentIntentId = paymentIntentId,
                    RequiresAction = paymentIntent.Status == "requires_action"
                };
            }

            return new PaymentConfirmationResponse
            {
                Success = false,
                PaymentStatus = PaymentStatus.Failed,
                BookingStatus = BookingStatus.Cancelled,
            };
        }
        catch (StripeException ex)
        {

            return new PaymentConfirmationResponse
            {
                Success = false,
                PaymentStatus = PaymentStatus.Failed,
                BookingStatus = BookingStatus.Cancelled,
                ErrorMessage = ex.Message,
            };
        }
    }

    public async Task<bool> ConfirmPaymentAsync(string paymentIntentId)
    {
        try
        {
            var paymentIntentService = new PaymentIntentService();
            var paymentIntent = await paymentIntentService.ConfirmAsync(paymentIntentId);

            if (paymentIntent.Metadata.TryGetValue("booking_id", out var bookingIdStr) &&
               int.TryParse(bookingIdStr, out var bookingId))
            {
                await UpdateBookingPaymentStatus(bookingId, paymentIntent);

            }

            return paymentIntent.Status == "succeeded";
        }
        catch (StripeException)
        {

            return false;
        }
    }



    public Task HandleWebhookAsync(string payloadJson, string stripeSignature)
    {
        try
        {
            var stripeEvent = EventUtility.ConstructEvent(
                payloadJson,
                stripeSignature,
                config["Stripe:WebhookSecret"]
            );

            switch (stripeEvent.Type)
            {
                case "payment_intent.succeeded":
                    return HandlePaymentIntentSucceeded(stripeEvent);
                case "payment_intent.payment_failed":
                    return HandlePaymentIntentFailed(stripeEvent);
                case "payment_intent.canceled":
                    return HandlePaymentIntentCancelled(stripeEvent);
                default:
                    // Gérer d'autres événements si nécessaire
                    return Task.CompletedTask;
            }

        }
        catch (StripeException)
        {
            throw new InvalidOperationException("Invalid webhook signature");
        }
    }


    private async Task HandlePaymentIntentSucceeded(Event stripeEvent)
    {
        var paymentIntent = stripeEvent.Data.Object as PaymentIntent;

        if (paymentIntent?.Metadata.TryGetValue("booking_id", out var bookingIdStr) == true &&
            int.TryParse(bookingIdStr, out var bookingId))
        {
            await UpdateBookingPaymentStatus(bookingId, paymentIntent);
        }
    }

    private async Task HandlePaymentIntentFailed(Event stripeEvent)
    {
        var paymentIntent = stripeEvent.Data.Object as PaymentIntent;

        if (paymentIntent?.Metadata.TryGetValue("booking_id", out var bookingIdStr) == true &&
            int.TryParse(bookingIdStr, out var bookingId))
        {
            var booking = await bookingRepo.GetBookingByIdWithDetailsAsync(bookingId);
            if (booking != null)
            {
                booking.Status = BookingStatus.Cancelled;
                booking.PaymentStatus = PaymentStatus.Failed;
                booking.CancellationReason = "Payment failed";
                booking.CancellationDate = DateTime.UtcNow;
                booking.UpdatedAt = DateTime.UtcNow;

                await bookingRepo.UpdateAsync(booking);
            }
        }
    }

    private async Task HandlePaymentIntentCancelled(Event stripeEvent)
    {
        var paymentIntent = stripeEvent.Data.Object as PaymentIntent;

        if (paymentIntent?.Metadata.TryGetValue("booking_id", out var bookingIdStr) == true &&
            int.TryParse(bookingIdStr, out var bookingId))
        {
            var booking = await bookingRepo.GetBookingByIdWithDetailsAsync(bookingId);
            if (booking != null)
            {
                booking.Status = BookingStatus.Cancelled;
                booking.PaymentStatus = PaymentStatus.Cancelled;
                booking.CancellationReason = "Payment cancelled";
                booking.CancellationDate = DateTime.UtcNow;
                booking.UpdatedAt = DateTime.UtcNow;

                await bookingRepo.UpdateAsync(booking);
            }
        }
    }


    private async Task UpdateBookingPaymentStatus(int bookingId, PaymentIntent paymentIntent)
    {
        var booking = await bookingRepo.GetBookingByIdWithDetailsAsync(bookingId);
        if (booking != null)
        {
            booking.PaymentStatus = MapStripeStatusToPaymentStatus(paymentIntent.Status);


            if (paymentIntent.Status == "succeeded")
            {
                booking.Status = BookingStatus.Confirmed;
                booking.PaymentCompletedAt = DateTime.UtcNow;
            }
            else
            {
                booking.Status = BookingStatus.Cancelled;
                booking.CancellationReason = "Payment failed";
                booking.CancellationDate = DateTime.UtcNow;
            }
            booking.UpdatedAt = DateTime.UtcNow;
            await bookingRepo.UpdateAsync(booking);
        }
    }

    private static PaymentStatus MapStripeStatusToPaymentStatus(string stripeStatus)
    {
        return stripeStatus switch
        {
            "requires_payment_method" => PaymentStatus.Pending,
            "requires_confirmation" => PaymentStatus.Pending,
            "requires_action" => PaymentStatus.Processing,
            "processing" => PaymentStatus.Processing,
            "succeeded" => PaymentStatus.Succeeded,
            "canceled" => PaymentStatus.Cancelled,
            _ => PaymentStatus.Failed
        };
    }


}
