using System;

namespace API.DTOs.ListingDto;

public class ListingLocationResponse
{
    public string Ville { get; set; } = string.Empty;
    public string Commune { get; set; } = string.Empty;
    public string Quartier { get; set; } = string.Empty;
    public string Avenue { get; set; } = string.Empty;
    public string NumeroDomicile { get; set; } = string.Empty;
}
