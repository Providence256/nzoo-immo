using System;

namespace API.DTOs.DeviseDto;

public class DeviseRequest
{
    public required string Code { get; set; }
    public required string Designation { get; set; }
    public bool IsFiscale { get; set; }
}
