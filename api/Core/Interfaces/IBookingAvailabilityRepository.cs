using System;
using Core.Entities;
using Infrastructure;

namespace Core.Interfaces;

public interface IBookingAvailabilityRepository : IGenericRepository<BookingAvailability>
{
    Task<IReadOnlyList<DateTime>> GetBlockedDatesForListingAsync(int listingId, DateTime startDate, DateTime endDate);
    Task<bool> IsDateBlockedAsync(int listingId, DateTime date);
    Task<BookingAvailability?> GetBlockedDateAsync(int listingId, DateTime date);
}
