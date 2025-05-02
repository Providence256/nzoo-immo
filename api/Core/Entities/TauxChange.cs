using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class TauxChange : BaseEntity
{
    public required int DeviseReferenceId { get; set; }
    public required int DeviseId { get; set; }
    public double UniteReference { get; set; }
    public double Taux { get; set; }

    [ForeignKey(nameof(DeviseReferenceId))]
    public required Devise DeviseReference { get; set; }
    [ForeignKey(nameof(DeviseId))]
    public required Devise Devise { get; set; }
}
