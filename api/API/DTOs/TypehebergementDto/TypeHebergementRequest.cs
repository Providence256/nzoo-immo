using System;

namespace API.DTOs.TypehebergementDto;

public class TypeHebergementRequest
{
    public required string Code { get; set; }
    public required string Designation { get; set; }
    public required string Icon { get; set; }
    public List<int> SousTypeIds { get; set; } = new();

}
