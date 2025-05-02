using System;

namespace Core.Entities;

public class Devise : BaseEntity
{
    public required string Code { get; set; }
    public required string Designation { get; set; }
    public bool IsFiscale { get; set; }
}
