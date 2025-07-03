using System;

namespace Core.Entities.Identity;

public class BathroomType : BaseEntity
{
    public required string Name { get; set; }
    public required string Description { get; set; }

    public virtual ICollection<ListingBathroomType> ListingBathroomTypes { get; set; } = new List<ListingBathroomType>();
}
