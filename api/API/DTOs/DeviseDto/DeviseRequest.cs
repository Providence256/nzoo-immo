using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs.DeviseDto;

public class DeviseRequest
{
    [Required]
    public string Code { get; set; } = string.Empty;
    [Required]
    public string Designation { get; set; } = string.Empty;
    public bool IsFiscale { get; set; }
}
