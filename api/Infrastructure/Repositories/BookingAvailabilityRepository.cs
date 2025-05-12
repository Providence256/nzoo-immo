using System;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class BookingAvailabilityRepository : GenericRepository<BookingAvailability>, IBookingAvailabilityRepository
{
    private readonly NzooContext _context;

    public BookingAvailabilityRepository(NzooContext context) : base(context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<DateTime>> GetBlockedDatesForListingAsync(int listingId, DateTime startDate, DateTime endDate)
    {
        var spec = new BookingAvailabilitySpecification(listingId, startDate, endDate);
        var blockedDates = await ApplySpecification(spec).Select(ba => ba.BlockedDate.Date).ToListAsync();
        return blockedDates;
    }

    public async Task<BookingAvailability?> GetBlockedDateAsync(int listingId, DateTime date)
    {
        var spec = new BookingAvailabilitySpecification(listingId, date);
        return await ApplySpecification(spec).FirstOrDefaultAsync();
    }

    public async Task<bool> IsDateBlockedAsync(int listingId, DateTime date)
    {
        var spec = new BookingAvailabilitySpecification(listingId, date);
        return await ApplySpecification(spec).AnyAsync();
    }
}