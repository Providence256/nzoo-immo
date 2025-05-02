using System;

namespace Core.Entities;

public class ListingPhoto : BaseEntity
{
    public int ListingId { get; set; }
    public required string PhotoUrl { get; set; }

    public virtual Listing? Listing { get; set; }
}
