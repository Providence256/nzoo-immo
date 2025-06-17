using System;

namespace API.DTOs.HostDto;

public class HostResponse
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string? UserName { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public DateTime JoinedDate { get; set; }
    public double Rating { get; set; }
    public int TotalReviews { get; set; }
    public int TotalBookings { get; set; }
    public bool IsVerified { get; set; }
    public DateTime VerifiedDate { get; set; }
    public bool IsActive { get; set; }
}

public class HostListResponse
{
    public int Id { get; set; }
    public string? UserName { get; set; }
    public string? Email { get; set; }
    public DateTime JoinedDate { get; set; }
    public double Rating { get; set; }
    public int TotalReviews { get; set; }
    public bool IsVerified { get; set; }
    public bool IsActive { get; set; }
}