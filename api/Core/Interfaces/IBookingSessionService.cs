using System;
using Core.Entities;
using Core.Entities.Identity;

namespace Core.Interfaces;

public interface IBookingSessionService
{
    Task<string> SetBookingSessionAsync(BookingData booking);
    Task<BookingSession> GetSessionAsync(string sessionId);
    Task UpdateSessionAsync(string sessionId, BookingData bookingData);
    Task DeleteSessionAsync(string sessionId);
}
