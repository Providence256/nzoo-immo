using System;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class BookingRepository : GenericRepository<Booking>, IBookingRepository
{
    private readonly NzooContext _context;

    public BookingRepository(NzooContext context) : base(context)
    {
        _context = context;
    }

    public async Task<Booking?> GetBookingByIdWithDetailsAsync(int id)
    {
        var spec = new BookingSpecification(id);
        return await ApplySpecification(spec).FirstOrDefaultAsync();
    }

    public async Task<IReadOnlyList<Booking>> GetBookingsByListingIdAsync(int listingId)
    {
        var spec = new BookingSpecification(listingId, true);
        return await ApplySpecification(spec).ToListAsync();
    }

    public async Task<IReadOnlyList<Booking>> GetBookingsByUserIdAsync(int userId)
    {
        var spec = new BookingSpecification(userId, false);
        return await ApplySpecification(spec).ToListAsync();
    }

    public async Task<bool> CheckBookingOverlapAsync(int listingId, DateTime checkInDate, DateTime checkOutDate, int? excludeBookingId = null)
    {
        var spec = new BookingSpecification(listingId, checkInDate, checkOutDate, excludeBookingId);
        var overlappingBookings = await ApplySpecification(spec).AnyAsync();
        return overlappingBookings;
    }

    public async Task<IReadOnlyList<DateTime>> GetBookedDatesForListingAsync(int listingId, DateTime startDate, DateTime endDate)
    {
        // Get all bookings in the date range that aren't cancelled or rejected
        var bookings = await _context.Bookings
            .Where(b => b.ListingId == listingId &&
                  b.Status != BookingStatus.Cancelled &&
                  b.Status != BookingStatus.Rejected &&
                  ((b.CheckInDate <= endDate && b.CheckOutDate >= startDate) ||
                   (b.CheckInDate >= startDate && b.CheckInDate < endDate) ||
                   (b.CheckOutDate > startDate && b.CheckOutDate <= endDate)))
            .ToListAsync();

        // Generate all dates that are covered by these bookings
        var bookedDates = new List<DateTime>();
        foreach (var booking in bookings)
        {
            var currentDate = booking.CheckInDate.Date;
            while (currentDate < booking.CheckOutDate.Date)
            {
                if (currentDate >= startDate.Date && currentDate <= endDate.Date)
                {
                    bookedDates.Add(currentDate);
                }
                currentDate = currentDate.AddDays(1);
            }
        }

        return bookedDates.Distinct().ToList();
    }

    public async Task<IReadOnlyList<Booking>> GetBookingByListingIdAsync(int listingId)
    {
        var spec = new BookingSpecification()
        {
            Criteria = b => b.ListingId == listingId
        };

        return await ApplySpecification(spec).ToListAsync();
    }

    public async Task<bool> CheckBookingOverlapAsync(int listingId)
    {
        return await _context.Bookings
            .AnyAsync(b => b.ListingId == listingId &&
                     b.Status != BookingStatus.Cancelled &&
                     b.Status != BookingStatus.Rejected);
    }

    public async Task<IReadOnlyList<DateTime>> GetBookedDateForListingAsync(int listingId)
    {
        var bookings = await _context.Bookings.Where(b => b.ListingId == listingId && b.Status != BookingStatus.Cancelled &&
                        b.Status != BookingStatus.Rejected &&
                        b.CheckOutDate >= DateTime.UtcNow).ToListAsync();

        var bookedDates = new List<DateTime>();
        foreach (var booking in bookings)
        {
            var currentDate = booking.CheckInDate.Date;
            while (currentDate < booking.CheckOutDate.Date)
            {
                bookedDates.Add(currentDate);
                currentDate = currentDate.AddDays(1);
            }
        }

        return bookedDates.Distinct().OrderBy(d => d).ToList();
    }
}