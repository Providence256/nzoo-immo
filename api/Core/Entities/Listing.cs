using System;
using Core.Entities.Identity;

namespace Core.Entities;

public class Listing : BaseEntity
{
    public int? UserId { get; set; }
    public int TypeHebergementId { get; set; }
    public int SousTypeHebergementId { get; set; }
    public int NbreVisiteurs { get; set; }
    public int NbreChambres { get; set; }
    public int NbreLits { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public string? WhoElseOnSite { get; set; }
    public int PriceId { get; set; }
    public int LocationId { get; set; }
    public ListingStatus Status { get; set; }

    public virtual AppUser? User { get; set; }
    public virtual ICollection<ListingEquipement>? Equipements { get; set; } = new List<ListingEquipement>();
    public virtual ICollection<ListingPhoto> Photos { get; set; } = new List<ListingPhoto>();
    public virtual ICollection<ListingRule>? Rules { get; set; } = new List<ListingRule>();
    public virtual ICollection<ListingBathroomType> BathroomTypes { get; set; } = new List<ListingBathroomType>();
    public virtual ICollection<ListingDiscount> Discounts { get; set; } = new List<ListingDiscount>();
    public virtual TypeHebergement? TypeHebergement { get; set; }
    public virtual SousTypeHebergement? SousTypeHebergement { get; set; }
    public virtual ListingPrice? Price { get; set; }
    public virtual ListingLocation? Location { get; set; }
}


public enum ListingStatus
{
    Processing = 0,
    Confirmed = 1,
    Rejected = 2,
}