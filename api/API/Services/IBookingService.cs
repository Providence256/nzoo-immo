using System;
using API.DTOs.BookingDto;
using Core.Entities;

namespace API.Services;

public interface IBookingService
{
    Task<AvailabilityCheckResponse> CheckAvailabilityAsync(AvailabilityCheckRequest request);
    Task<Booking> CreateBooking(BookingRequest request, int userId);
    Task<bool> CancelBookingStatusAsync(int bookingId, int userId, string reason);
    Task<bool> UpdateBookingStatusAsync(int bookingId, BookingStatus status, string? reason = null);
    Task<bool> BlockDateAsync(BlockDateRequest request, int hostId);
    Task<bool> UnblockDateAsync(int listingId, DateTime date, int hostId);
}
