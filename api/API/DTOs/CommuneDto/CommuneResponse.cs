using System;

namespace API.DTOs.CommuneDto;

public class CommuneResponse
{
    public int Id { get; set; }
    public required string Code { get; set; }
    public required string Designation { get; set; }
    public required int VilleId { get; set; }
    public required string Ville { get; set; }
}
