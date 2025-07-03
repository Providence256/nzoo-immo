using System;
using Core.Entities.Identity;

namespace API.DTOs.ListingDto;

public class ListingRequest
{
    public int TypeHebergementId { get; set; }
    public int SousTypeHebergementId { get; set; }
    public int NbreVisiteurs { get; set; }
    public int NbreChambres { get; set; }
    public int NbreLits { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }

    public string? WhoElseOnSite { get; set; }
    public int VilleId { get; set; }
    public int CommuneId { get; set; }
    public required string Quartier { get; set; }
    public required string Avenue { get; set; }
    public required string NumeroDomicile { get; set; }
    public int DeviseId { get; set; }
    public double PrixBase { get; set; }

    public required ICollection<ListingEquipementRequest>? Equipements { get; set; }
    public required ICollection<IFormFile> Photos { get; set; }
    public List<ListingBathroomTypeRequest>? BathroomTypes { get; set; }
    public List<int>? DiscountsIds { get; set; }
}
