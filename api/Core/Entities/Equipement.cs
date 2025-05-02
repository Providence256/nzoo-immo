
namespace Core.Entities;

public class Equipement : BaseEntity
{
    public required string Code { get; set; }
    public required string Designation { get; set; }
    public required string Icon { get; set; }
}
