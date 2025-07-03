using System;

namespace Core.Entities;

public class ListingDiscount : BaseEntity
{
    public int ListingId { get; set; }
    public int DiscountId { get; set; }

    public virtual Listing Listing { get; set; } = null!;
    public virtual Discount Discount { get; set; } = null!;
}
