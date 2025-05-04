using System;

namespace API.DTOs.ListingDto;

public class RuleResponse
{
    public string Nom { get; set; } = string.Empty;
    public bool IsSelected { get; set; }
}
