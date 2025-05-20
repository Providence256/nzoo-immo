using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingSessionController(IBookingSessionService bookingSessionService) : ControllerBase
    {

        [HttpPost]
        public async Task<IActionResult> CreateBookingSession([FromBody] BookingData request)
        {
            try
            {
                var session = await bookingSessionService.SetBookingSessionAsync(request);
                return Ok(session);
            }
            catch (Exception ex)
            {

                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSession(string id)
        {
            try
            {
                var session = await bookingSessionService.GetSessionAsync(id);

                if (session == null)
                    return NotFound(new { error = "Booking session not found or expired" });

                return Ok(session);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Failed to retrieve booking session", message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSession(string id, [FromBody] BookingData request)
        {
            try
            {
                await bookingSessionService.UpdateSessionAsync(id, request);
                return Ok(new { message = "Booking session updated" });
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { error = "Booking session not found or expired" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Failed to update booking session", message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSession(string id)
        {
            try
            {
                await bookingSessionService.DeleteSessionAsync(id);
                return Ok(new { message = "Booking session deleted" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Failed to delete booking session", message = ex.Message });
            }
        }



    }
}
