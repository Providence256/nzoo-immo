using System;

namespace API.DTOs.HostDto;

public class BecomeHostRequest
{
    public string PhoneNumber { get; set; } = string.Empty;
}


public class UpdateHostRequest
{
    public string? PhoneNumber { get; set; }
}