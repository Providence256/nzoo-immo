using System;

namespace API.DTOs.BathroomTypeDto;

public class BathroomTypeRequest
{
    public required string Name { get; set; }
    public required string Description { get; set; }
}
