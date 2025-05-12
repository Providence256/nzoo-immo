using System;

namespace Core.Entities;

public class BookingAvailability : BaseEntity
{
    public int ListingId { get; set; }
    public DateTime BlockedDate { get; set; }
    public bool IsBlocked { get; set; }
    public string? Reason { get; set; }

    public virtual Listing? Listing { get; set; }
}
