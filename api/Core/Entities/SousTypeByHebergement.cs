using System;

namespace Core.Entities;

public class SousTypeByHebergement : BaseEntity
{
    public int TypeHebergementId { get; set; }
    public int SousTypeHebergementId { get; set; }

    public virtual TypeHebergement? TypeHebergement { get; set; }
    public virtual SousTypeHebergement? SousTypeHebergement { get; set; }
}
