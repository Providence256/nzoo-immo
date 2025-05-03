using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs.RuleDto;

public class RuleRequest
{
    [Required]
    public string Libelle { get; set; } = string.Empty;
}
