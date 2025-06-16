using System;

namespace Core.Entities;

public class SousTypeHebergement : BaseEntity
{
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required string Icon { get; set; }

}
