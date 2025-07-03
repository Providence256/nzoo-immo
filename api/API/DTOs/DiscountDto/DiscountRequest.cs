using System;

namespace API.DTOs.DiscountDto;

public class DiscountRequest
{
    public required string Name { get; set; }
    public required string Description { get; set; }
    public int Percentage { get; set; }
}
