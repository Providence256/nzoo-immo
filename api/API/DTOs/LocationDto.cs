using System;

namespace API.DTOs;

public class LocationDto
{
    public required string Ville { get; set; }
    public required string Commune { get; set; }
    public required string Quartier { get; set; }
    public required string Avenue { get; set; }
    public required string NumeroDomicile { get; set; }
}
