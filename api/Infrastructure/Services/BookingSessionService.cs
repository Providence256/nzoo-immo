using System;
using System.Text.Json;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using StackExchange.Redis;

namespace Infrastructure.Services;

public class BookingSessionService(IConnectionMultiplexer redis) : IBookingSessionService
{

    private readonly IDatabase _database = redis.GetDatabase();
    public async Task DeleteSessionAsync(string sessionId)
    {
        await _database.KeyDeleteAsync($"booking:{sessionId}");
    }

    public async Task<BookingSession> GetSessionAsync(string sessionId)
    {
        var value = await _database.StringGetAsync($"booking:{sessionId}");
        if (value.IsNullOrEmpty) return null!;

        await _database.KeyExpireAsync($"booking:{sessionId}", TimeSpan.FromHours(1));

        return JsonSerializer.Deserialize<BookingSession>(value!)!;

    }

    public async Task<string> SetBookingSessionAsync(BookingData booking)
    {
        var sessionId = Guid.NewGuid().ToString();
        var bookingSession = new BookingSession
        {
            Id = sessionId,
            Booking = booking,
            CreatedAt = DateTime.UtcNow,
        };

        var json = JsonSerializer.Serialize(bookingSession);
        await _database.StringSetAsync($"booking:{sessionId}", json, TimeSpan.FromHours(1));

        return sessionId;
    }

    public async Task UpdateSessionAsync(string sessionId, BookingData bookingData)
    {
        var session = await GetSessionAsync(sessionId);
        if (session == null) throw new KeyNotFoundException("Session not found");

        if (bookingData != null)
        {
            session.Booking = bookingData;
            session.UpdatedAt = DateTime.UtcNow;

            var json = JsonSerializer.Serialize(session);
            await _database.StringSetAsync($"booking:{sessionId}", json, TimeSpan.FromHours(1));
        }
        else
        {
            throw new ArgumentNullException(nameof(bookingData), "Booking data cannot be null");
        }
    }
}
