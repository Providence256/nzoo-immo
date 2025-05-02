using System;

namespace Core.Entities;

public class TypeHebergement : BaseEntity
{
    public required string Code { get; set; }
    public required string Designation { get; set; }
}
