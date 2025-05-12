using System;
using Core.Entities.Identity;

namespace Core.Entities;

public class Booking : BaseEntity
{
    public int ListingId { get; set; }
    public int UserId { get; set; }
    public DateTime CheckInDate { get; set; }
    public DateTime CheckOutDate { get; set; }
    public int GuestCount { get; set; }
    public double TotalPrice { get; set; }
    public BookingStatus Status { get; set; } = BookingStatus.Pending;
    public string? CancellationReason { get; set; }
    public DateTime? CancellationDate { get; set; }

    public virtual Listing? Listing { get; set; }
    public virtual AppUser? User { get; set; }
}


public enum BookingStatus
{
    Pending = 0,
    Confirmed = 1,
    Cancelled = 2,
    Completed = 3,
    Rejected = 4,
}