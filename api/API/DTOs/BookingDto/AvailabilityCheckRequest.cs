using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs.BookingDto;

public class AvailabilityCheckRequest
{
    [Required]
    public int ListingId { get; set; }

    [Required]
    public DateTime CheckInDate { get; set; }

    [Required]
    public DateTime CheckOutDate { get; set; }

    [Required]
    [Range(1, 20)]
    public int GuestCount { get; set; }
}

public class AvailabilityCheckResponse
{
    public bool IsAvailable { get; set; }
    public double TotalPrice { get; set; }
    public string Currency { get; set; } = null!;
    public int Nights { get; set; }
    public double BasePrice { get; set; }
    public double CleaningFee { get; set; }
    public double GuestFee { get; set; }
    public double Discount { get; set; }
    public List<DateRange> UnavailableDates { get; set; } = new();
}

public class BlockDateRequest
{
    [Required]
    public int ListingId { get; set; }

    [Required]
    public DateTime BlockedDate { get; set; }

    public string? Reason { get; set; }
}

public class DateRange
{
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}