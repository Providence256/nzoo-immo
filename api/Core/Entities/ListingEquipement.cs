using System;

namespace Core.Entities;

public class ListingEquipement : BaseEntity
{
    public int ListingId { get; set; }
    public int EquipementId { get; set; }


    public virtual Equipement? Equipement { get; set; }
    public virtual Listing? Listing { get; set; }
}
