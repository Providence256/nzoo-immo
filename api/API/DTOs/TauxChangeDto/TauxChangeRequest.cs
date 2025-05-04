using System;

namespace API.DTOs.TauxChangeDto;

public class TauxChangeRequest
{
    public required int DeviseReferenceId { get; set; }
    public required int DeviseId { get; set; }
    public double UniteReference { get; set; }
    public double Taux { get; set; }

}

public class TauxChangeResponse
{
    public int Id { get; set; }
    public int DeviseReferenceId { get; set; }
    public int DeviseId { get; set; }
    public double UniteReference { get; set; }
    public double Taux { get; set; }
    public string? DeviseReferenceCode { get; set; }
    public string? DeviseReferenceDesignation { get; set; }
    public string? DeviseCode { get; set; }
    public string? DeviseDesignation { get; set; }
}
