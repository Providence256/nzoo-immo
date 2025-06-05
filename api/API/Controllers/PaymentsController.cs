using API.DTOs.BookingDto;
using API.Helpers;
using API.Services;
using Core.Entities;
using Core.Specification;
using Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController(IPaymentService paymentService,
        IGenericRepository<Booking> bookingRepo,
        ILogger<PaymentsController> logger) : ControllerBase
    {

        private readonly string _whSecret = "";

        [Authorize]
        [HttpPost("create-paymentintent")]
        public async Task<ActionResult<BookingWithPaymentResponse>> CreatePaymentIntent([FromBody] BookingWithPaymentRequest request)
        {
            try
            {
                var userId = User.GetUserId();
                var result = await paymentService.CreatePaymentIntentAsync(request, userId);

                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (UnauthorizedAccessException)
            {
                return Forbid();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "An error occurred while creating paymentIntent",
                    error = ex.Message
                });
            }
        }

        [Authorize]
        [HttpPost("save-booking")]
        public async Task<ActionResult<BookingWithPaymentResponse>> SaveBookingAsync(BookingWithPaymentRequest request)
        {
            try
            {
                var userId = User.GetUserId();
                var result = await paymentService.SaveBookingAndConfirmPaymentAsync(request, userId);

                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (UnauthorizedAccessException)
            {
                return Forbid();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "An error occurred while creating paymentIntent",
                    error = ex.Message
                });
            }
        }

        [HttpPost("webhook")]
        public async Task<IActionResult> StripeWebHook()
        {
            var json = await new StreamReader(Request.Body).ReadToEndAsync();

            try
            {
                var stripeEvent = ConstructStripeEvent(json);

                if (stripeEvent.Data.Object is not PaymentIntent intent)
                {
                    return BadRequest("Invalid event data");
                }

                await HandlePaymentIntentSucceed(intent);

                return Ok();
            }
            catch (StripeException ex)
            {
                logger.LogError(ex, "Stripe webhook error ");
                return StatusCode(StatusCodes.Status500InternalServerError, "webHook error");
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An unexpected error occurred");
                return StatusCode(StatusCodes.Status500InternalServerError, "An unexpected error occurred");
            }
        }

        private async Task HandlePaymentIntentSucceed(PaymentIntent intent)
        {
            if (intent.Status == "succeeded")
            {
                var spec = new BookingSpecification(intent.Id, true);

                var booking = await bookingRepo.ApplySpecification(spec).FirstOrDefaultAsync()
                            ?? throw new Exception("Booking not found");
                if ((long)booking.TotalPrice * 100 != intent.Amount)
                {
                    booking.Status = BookingStatus.PaymentMissmatch;
                }
                else
                {
                    booking.Status = BookingStatus.PaymentReceived;
                }

                await bookingRepo.AddAsync(booking);

                // TODO: SignalR
            }
        }

        private Event ConstructStripeEvent(string json)
        {
            try
            {
                return EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"],
                    _whSecret);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Failed to construct stripe event");
                throw new StripeException("Invalid signature");
            }
        }




    }
}
