using System;

namespace API.DTOs.BookingDto;

public class BookingWithPaymentRequest
{
    public int ListingId { get; set; }
    public DateTime CheckInDate { get; set; }
    public DateTime CheckOutDate { get; set; }
    public int Adults { get; set; }
    public int Children { get; set; }
    public int Babies { get; set; }
    public string? CustomerEmail { get; set; }
    public string? paymentIntentId { get; set; }
}
