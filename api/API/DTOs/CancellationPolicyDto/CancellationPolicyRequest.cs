using System;

namespace API.DTOs.CancellationPolicyDto;

public class CancellationPolicyRequest
{
    public required string Designation { get; set; }
    public required string Description { get; set; }
}
