using System;

namespace API.DTOs.RuleDto;

public class RuleRequest
{
    public required int RuleId { get; set; }
    public required bool Iselected { get; set; }
}
