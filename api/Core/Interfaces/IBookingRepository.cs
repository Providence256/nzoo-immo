using System;
using Core.Entities;
using Infrastructure;

namespace Core.Interfaces;

public interface IBookingRepository : IGenericRepository<Booking>
{
    Task<IReadOnlyList<Booking>> GetBookingsByUserIdAsync(int userId);
    Task<IReadOnlyList<Booking>> GetBookingByListingIdAsync(int listingId);
    Task<Booking?> GetBookingByIdWithDetailsAsync(int id);
    Task<bool> CheckBookingOverlapAsync(int listingId, DateTime checkInDate, DateTime checkOutDate, int? excludedBookingId = null);
    Task<IReadOnlyList<DateTime>> GetBookedDatesForListingAsync(int listingId, DateTime startDate, DateTime endDate);
}
