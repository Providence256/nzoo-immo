using System;

namespace API.DTOs.CommuneDto;

public class CommuneRequest
{
    public required string Code { get; set; }
    public int VilleId { get; set; }
    public required string Designation { get; set; }
}
