using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs.BookingDto;

public class BookingRequest
{
    [Required]
    public int ListingId { get; set; }

    [Required]
    public DateTime CheckInDate { get; set; }

    [Required]
    public DateTime CheckOutDate { get; set; }

    [Required]
    [Range(1, 20)]
    public int Adults { get; set; }
    public int Children { get; set; }
    public int Babies { get; set; }
}
