using System;

namespace Core.Entities;

public class ListingRule : BaseEntity
{
    public int ListingId { get; set; }
    public int RuleId { get; set; }
    public virtual Listing? Listing { get; set; }
    public virtual Rule? Rule { get; set; }
}
