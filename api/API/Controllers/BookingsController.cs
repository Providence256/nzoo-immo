using Core.Entities;
using Core.Specification;
using Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController(
        IGenericRepository<Booking> bookingRepo,
        IGenericRepository<Listing> listingRepo,
        IGenericRepository<BookingAvailability> availabilityRepo
        ) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookings()
        {
            var bookings = await bookingRepo.GetAllAsync();
            return Ok(bookings);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBooking(int id)
        {
            var booking = await bookingRepo.GetByIdAsync(id);
            if (booking == null) return NotFound();
            return Ok(booking);
        }
        [HttpPost]
        public async Task<ActionResult<Booking>> CreateBooking([FromBody] Booking booking)
        {
            // 1. Vérifier que le logement existe
            var listing = await listingRepo.GetByIdAsync(booking.ListingId);
            if (listing == null)
                return BadRequest("Listing not found");

            // 2. Vérifier la disponibilité (Booking et BookingAvailability)
            bool isAvailable = await IsListingAvailable(booking.ListingId, booking.CheckInDate, booking.CheckOutDate);
            if (!isAvailable)
                return BadRequest("Listing is not available for the selected dates");

            booking.Status = BookingStatus.Pending;
            var createdBooking = await bookingRepo.AddAsync(booking);
            return CreatedAtAction(nameof(GetBooking), new { id = createdBooking.Id }, createdBooking);
        }

        [HttpPut("cancel/{id}")]
        public async Task<IActionResult> CancelBooking(int id, [FromBody] string reason)
        {
            var booking = await bookingRepo.GetByIdAsync(id);
            if (booking == null) return NotFound();

            booking.Status = BookingStatus.Cancelled;
            booking.CancellationDate = DateTime.UtcNow;
            booking.CancellationReason = reason;

            await bookingRepo.UpdateAsync(booking);
            return NoContent();
        }

        private async Task<bool> IsListingAvailable(int listingId, DateTime checkIn, DateTime checkOut)
        {
            // 1. Vérifier les réservations existantes
            var spec = new BookingSpecificationActiveInRange(listingId, checkIn, checkOut);
            var existingBookings = await bookingRepo.ListAsync(spec);

            if (existingBookings.Any()) return false;

            // 2. Vérifier les dates bloquées manuellement
            var blocked = await availabilityRepo.GetAllAsync();
            return !blocked.Any(b =>
                b.ListingId == listingId &&
                b.IsBlocked &&
                b.BlockedDate >= checkIn.Date &&
                b.BlockedDate <= checkOut.Date);
        }



    }
}
