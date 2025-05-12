using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs.BookingDto;

public class BookingCancellationRequest
{
    [Required]
    public string Reason { get; set; } = null!;
}
