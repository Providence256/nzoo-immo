using System;

namespace API.DTOs.ListingDto;

public class ListingRuleRequest
{
    public required int RuleId { get; set; }
    public required bool Value { get; set; }
}
