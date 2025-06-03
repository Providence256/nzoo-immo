using System;
using Core.Entities;

namespace API.DTOs.BookingDto;

public class PaymentIntentResponse
{
    public string PaymentIntentId { get; set; }
    public string ClientSecret { get; set; }
    public PaymentStatus Status { get; set; }
    public double TotalPrice { get; set; }
    public string Currency { get; set; }
    public bool RequiresAction { get; set; }
}
