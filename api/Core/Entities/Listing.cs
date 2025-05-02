using System;

namespace Core.Entities;

public class Listing : BaseEntity
{
    public int TypeHebergementId { get; set; }
    public int NbreVisiteurs { get; set; }
    public int NbreChambres { get; set; }
    public int NbreDouches { get; set; }
    public int NbreLits { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public int PriceId { get; set; }
    public int LocationId { get; set; }
    public virtual ICollection<ListingEquipement> Equipements { get; set; } = new List<ListingEquipement>();
    public virtual ICollection<ListingPhoto> Photos { get; set; } = new List<ListingPhoto>();
    public virtual ICollection<ListingRule> Rules { get; set; } = new List<ListingRule>();
    public virtual TypeHebergement? TypeHebergement { get; set; }
    public virtual ListingPrice? Price { get; set; }
    public virtual ListingLocation? Location { get; set; }
}
