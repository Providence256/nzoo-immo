namespace Core.Entities;

public class TypeHebergement : BaseEntity
{
    public required string Code { get; set; }
    public required string Designation { get; set; }
    public required string Icon { get; set; }

    public virtual ICollection<SousTypeByHebergement> SousTypes { get; set; } = new List<SousTypeByHebergement>();
}
