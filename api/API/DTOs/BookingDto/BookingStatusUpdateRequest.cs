using System;
using System.ComponentModel.DataAnnotations;
using Core.Entities;

namespace API.DTOs.BookingDto;

public class BookingStatusUpdateRequest
{
    [Required]
    public BookingStatus Status { get; set; }

    public string? Reason { get; set; }
}
