using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs.VilleDto;

public class VilleRequest
{
    [Required]
    public string Code { get; set; } = string.Empty;
    [Required]
    public string Designation { get; set; } = string.Empty;
    [Required]
    public string Description { get; set; } = string.Empty;
    public IFormFile? Image { get; set; }
}
