using System;
using Core.Entities.Identity;

namespace Core.Entities;

public class HostEntity : BaseEntity
{
    public int UserId { get; set; }
    public string? PhoneNumber { get; set; }
    public DateTime JoinedDate { get; set; } = DateTime.UtcNow;
    public double Rating { get; set; } = 0.0;
    public int TotalReviews { get; set; } = 0;
    public int TotalBookings { get; set; } = 0;
    public bool IsVerified { get; set; } = false;
    public DateTime? VerifiedDate { get; set; }
    public bool IsActive { get; set; }

    public virtual AppUser? User { get; set; }
    public virtual ICollection<Listing> Listings { get; set; } = new List<Listing>();
}
