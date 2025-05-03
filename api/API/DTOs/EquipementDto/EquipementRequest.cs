using System;

namespace API.DTOs.EquipementDto;

public class EquipementRequest
{
    public required string Code { get; set; }
    public required string Designation { get; set; }
    public required string Icon { get; set; }
}
