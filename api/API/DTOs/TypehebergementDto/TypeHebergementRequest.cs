using System;

namespace API.DTOs.TypehebergementDto;

public class TypeHebergementRequest
{
    public required string Code { get; set; }
    public required string Designation { get; set; }
}
