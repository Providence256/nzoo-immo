using System;

namespace Core.Entities;

public class Commune : BaseEntity
{
    public required string Code { get; set; }
    public int VilleId { get; set; }
    public required string Designation { get; set; }
    public required Ville Ville { get; set; }
}
