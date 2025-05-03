using System;

namespace API.DTOs;

public class PriceDto
{
    public double PrixBase { get; set; }
    public required string DeviseCode { get; set; }
    public double Reduction { get; set; }
    public double FraisMenage { get; set; }
}
