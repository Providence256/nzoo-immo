using System;

namespace API.DTOs.SousTypehebergementDto;

public class SousTypeRequest
{
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required string Icon { get; set; }
}
