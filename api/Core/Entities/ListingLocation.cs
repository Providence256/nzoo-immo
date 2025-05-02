using System;

namespace Core.Entities;

public class ListingLocation : BaseEntity
{
    public int ListingId { get; set; }
    public int VilleId { get; set; }
    public int CommuneId { get; set; }
    public required string Quartier { get; set; }
    public required string Avenue { get; set; }
    public required string NumeroDomicile { get; set; }

    public Listing? Listing { get; set; }
    public Ville? Ville { get; set; }
    public Commune? Commune { get; set; }
}
