using System;
using Core.Entities.Identity;

namespace Core.Entities;

public class Booking : BaseEntity
{
    public int ListingId { get; set; }
    public int UserId { get; set; }
    public DateTime CheckInDate { get; set; }
    public DateTime CheckOutDate { get; set; }
    public GuestDetails Guests { get; set; } = new GuestDetails();
    public int Nights { get; set; }
    public double BasePrice { get; set; }
    public double TotalPrice { get; set; }
    public string Devise { get; set; } = "USD"; // Default to USD, can be changed based on listing or user preference
    public BookingStatus Status { get; set; } = BookingStatus.Pending;
    public string? CancellationReason { get; set; }
    public DateTime? CancellationDate { get; set; }


    public string? PaymentIntentId { get; set; }
    public string? ClientSecret { get; set; }
    public DateTime? PaymentCompletedAt { get; set; }
    public PaymentStatus PaymentStatus { get; set; }

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

public enum PaymentStatus
{
    Pending = 0,
    Processing = 1,
    Succeeded = 2,
    Failed = 3,
    Cancelled = 4,
}

public class GuestDetails
{
    public int Adults { get; set; }
    public int Children { get; set; }
    public int Babies { get; set; }
}