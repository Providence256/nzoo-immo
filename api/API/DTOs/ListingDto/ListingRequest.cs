using System;

namespace API.DTOs.ListingDto;

public class ListingRequest
{
    public int TypeHebergementId { get; set; }
    public int NbreVisiteurs { get; set; }
    public int NbreChambres { get; set; }
    public int NbreDouches { get; set; }
    public int NbreLits { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public int VilleId { get; set; }
    public int CommuneId { get; set; }
    public required string Quartier { get; set; }
    public required string Avenue { get; set; }
    public required string NumeroDomicile { get; set; }
    public int DeviseId { get; set; }
    public double PrixBase { get; set; }
    public double Reduction { get; set; }
    public double ReductionHebdo { get; set; }
    public double ReductionMensu { get; set; }
    public double FraisMenage { get; set; }
    public double PersoSuppl { get; set; }

    public required ICollection<ListingEquipementRequest> Equipements { get; set; }
    public required ICollection<IFormFile> Photos { get; set; }
    public required ICollection<ListingRuleRequest> Rules { get; set; }
}
