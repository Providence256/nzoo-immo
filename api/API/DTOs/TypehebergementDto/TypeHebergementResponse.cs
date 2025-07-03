using System;

namespace API.DTOs.TypehebergementDto;

public class TypeHebergementResponse
{
    public int Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Designation { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public List<SousTypeResponse> SousTypes { get; set; } = new();

}


public class SousTypeResponse
{
    public int Id { get; set; }
    public string Designation { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;

}
