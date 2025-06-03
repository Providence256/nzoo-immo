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

    // Informations de paiement
    public string? PaymentMethodId { get; set; } = string.Empty;
    public bool? SavePaymentMethod { get; set; } = false;
    public string? CustomerEmail { get; set; }
}
