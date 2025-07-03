using System;

namespace Core.Entities;

public class Discount : BaseEntity
{
    public required string Name { get; set; }
    public required string Description { get; set; }
    public int Percentage { get; set; }
    public virtual ICollection<ListingDiscount> ListingDiscounts { get; set; } = new List<ListingDiscount>();
}

public enum DiscountType
{
    NewListing,
    LastMinute,
    Weekly,
    Monthly,
}