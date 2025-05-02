using System;

namespace Core.Entities;

public class ListingPrice : BaseEntity
{
    public int ListingId { get; set; }
    public int DeviseId { get; set; }
    public double PrixBase { get; set; }
    public double Reduction { get; set; }
    public double ReductionHebdo { get; set; }
    public double ReductionMensu { get; set; }
    public double FraisMenage { get; set; }
    public double PersoSuppl { get; set; }

    public Listing? Listing { get; set; }
    public Devise? Devise { get; set; }
}
