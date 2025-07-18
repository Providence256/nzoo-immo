using System;

namespace Core.Entities;

public class CancellationPolicy : BaseEntity
{
    public required string Designation { get; set; }
    public required string Description { get; set; }
}
