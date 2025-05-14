using API.DTOs.BookingDto;
using API.Helpers;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController(
       IBookingService bookingService,
       IMapper mapper
        ) : ControllerBase
    {

        [HttpPost("check-availability")]
        public async Task<ActionResult<AvailabilityCheckResponse>> CheckAvailability([FromBody] AvailabilityCheckRequest request)
        {
            try
            {
                var response = await bookingService.CheckAvailabilityAsync(request);
                return Ok(response);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while checking availability");
            }
        }
        [HttpPost]
        public async Task<ActionResult<BookingResponse>> CreateBooking([FromBody] BookingRequest request)
        {


            try
            {
                var userId = User.GetUserId();
                var booking = await bookingService.CreateBooking(request, userId);

                // Map to response DTO
                var response = mapper.Map<BookingResponse>(booking);

                return CreatedAtAction(nameof(GetBookingById), new { id = booking.Id }, response);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while creating booking");
            }
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<BookingResponse>> GetBookingById(int id)
        {
            try
            {

                var booking = await bookingService.GetBookingByIdAsync(id, User.GetUserId());
                if (booking == null)
                {
                    return NotFound();
                }

                var response = mapper.Map<BookingResponse>(booking);
                return Ok(response);
            }
            catch (UnauthorizedAccessException)
            {
                return Forbid();
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while retrieving the booking");
            }
        }

        [Authorize]
        [HttpPut("{id}/cancel")]
        public async Task<ActionResult> CancelBooking(int id, [FromBody] BookingCancellationRequest request)
        {


            try
            {
                var userId = User.GetUserId();
                var success = await bookingService.CancelBookingStatusAsync(id, userId, request.Reason);

                if (success)
                {
                    return NoContent();
                }

                return BadRequest("Unable to cancel booking");
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
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while cancelling the booking");
            }
        }

        [HttpPut("{id}/status")]
        public async Task<ActionResult> UpdateBookingStatus(int id, [FromBody] BookingStatusUpdateRequest request)
        {


            try
            {
                var success = await bookingService.UpdateBookingStatusAsync(id, request.Status, request.Reason);

                if (success)
                {
                    return NoContent();
                }

                return BadRequest("Unable to update booking status");
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while updating booking status");
            }
        }

        [Authorize]
        [HttpPost("block-date")]
        public async Task<ActionResult> BlockDate([FromBody] BlockDateRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var userId = User.GetUserId();
                var success = await bookingService.BlockDateAsync(request, userId);

                if (success)
                {
                    return NoContent();
                }

                return BadRequest("Unable to block date");
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while blocking the date");
            }
        }

        [Authorize]
        [HttpDelete("unblock-date")]
        public async Task<ActionResult> UnblockDate([FromQuery] int listingId, [FromQuery] DateTime date)
        {
            try
            {
                var userId = User.GetUserId();
                var success = await bookingService.UnblockDateAsync(listingId, date, userId);

                if (success)
                {
                    return NoContent();
                }

                return BadRequest("Unable to unblock date");
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while unblocking the date");
            }
        }

    }
}
