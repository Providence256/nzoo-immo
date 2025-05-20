using System;
using Core.Entities.Identity;

namespace Core.Entities;

public class BookingSession
{
    public required string Id { get; set; }
    public required BookingData Booking { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}


