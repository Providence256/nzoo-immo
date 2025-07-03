using System;
using Core.Entities.Identity;

namespace Core.Entities;

public class ListingBathroomType : BaseEntity
{
    public int ListingId { get; set; }
    public int BathroomTypeId { get; set; }
    public int Count { get; set; }

    public virtual Listing Listing { get; set; } = null!;
    public virtual BathroomType BathroomType { get; set; } = null!;
}
