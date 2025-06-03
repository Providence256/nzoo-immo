using API.DTOs.BookingDto;
using API.Helpers;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController(IPaymentService paymentService) : ControllerBase
    {
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

        [HttpPost("confirm-and-pay")]
        public async Task<ActionResult<BookingWithPaymentResponse>> CreateBookingAndPay(BookingWithPaymentRequest request)
        {
            try
            {
                var userId = User.GetUserId();

                var paymentIntent = await paymentService.CreatePaymentIntentAsync(request, userId);

                var booking = await paymentService.SaveBookingAndConfirmPaymentAsync(request, paymentIntent.PaymentIntentId, userId);

                return Ok(booking);
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
                    message = "An error occurred while processing booking and payment",
                    error = ex.Message
                });
            }
        }
    }
}
