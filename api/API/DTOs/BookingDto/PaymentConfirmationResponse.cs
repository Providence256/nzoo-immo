using System;
using Core.Entities;

namespace API.DTOs.BookingDto;

public class PaymentConfirmationResponse
{
    public bool Success { get; set; }
    public PaymentStatus PaymentStatus { get; set; }
    public BookingStatus BookingStatus { get; set; }
    public int BookingId { get; set; }
    public string PaymentIntentId { get; set; } = string.Empty;
    public bool RequiresAction { get; set; }
    public string? ErrorMessage { get; set; }
}
