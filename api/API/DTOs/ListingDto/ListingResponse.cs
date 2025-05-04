using System;

namespace API.DTOs.ListingDto;

public class ListingResponse
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int NbreVisiteurs { get; set; }
    public int NbreChambres { get; set; }
    public int NbreDouches { get; set; }
    public int NbreLits { get; set; }
    public string TypeHebergement { get; set; } = string.Empty;
    public List<string> PhotoUrls { get; set; } = new();
    public ListingPriceResponse? Price { get; set; }
    public ListingLocationResponse? Location { get; set; }
    public List<EquipementResponse> Equipements { get; set; } = new();
    public List<RuleResponse> Rules { get; set; } = new();
}
