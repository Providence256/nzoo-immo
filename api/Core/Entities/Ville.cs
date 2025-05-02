using System;

namespace Core.Entities;

public class Ville : BaseEntity
{
    public required string Code { get; set; }
    public required string Designation { get; set; }
    public required string Description { get; set; }
    public required string ImageUrl { get; set; }
}
