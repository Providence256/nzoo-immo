using System;

namespace API.DTOs.ListingDto;

public class ListingPriceResponse
{
    public double PrixBase { get; set; }
    public double Reduction { get; set; }
    public double ReductionHebdo { get; set; }
    public double ReductionMensu { get; set; }
    public double FraisMenage { get; set; }
    public double PersoSuppl { get; set; }
    public string CodeDevise { get; set; } = string.Empty;
}
