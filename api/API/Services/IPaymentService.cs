using API.DTOs.BookingDto;

namespace API.Services;

public interface IPaymentService
{
    Task<PaymentIntentResponse> CreatePaymentIntentAsync(BookingWithPaymentRequest request, int userId);
    Task<BookingWithPaymentResponse> SaveBookingAndConfirmPaymentAsync(BookingWithPaymentRequest request, int userId);
    Task<bool> ConfirmPaymentAsync(string paymentIntentId);
    Task HandleWebhookAsync(string payloadJson, string stripeSignature);
}

