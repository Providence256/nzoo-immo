using System;

namespace API.DTOs.HostDto;

public class BecomeHostRequest
{
    public string PhoneNumber { get; set; } = string.Empty;
    public string? HostDescription { get; set; }
}

public class ApproveHostRequest
{
    public bool IsApproved { get; set; }
    public string? RejectionReason { get; set; }
}


public class UpdateHostRequest
{
    public string? PhoneNumber { get; set; }
    public string? HostDescription { get; set; }
}