using System;
using Core.Entities;

namespace API.DTOs.BookingDto;

public class BookingWithPaymentResponse
{


    public int BookingId { get; set; }
    public int ListingId { get; set; }
    public int UserId { get; set; }
    public BookingStatus Status { get; set; }
    public double TotalPrice { get; set; }
    public string Currency { get; set; } = string.Empty;

    // Informations de paiement
    public PaymentStatus PaymentStatus { get; set; }
    public string? PaymentIntentId { get; set; }
    public string? ClientSecret { get; set; }
    public bool RequiresAction { get; set; }
    public DateTime? PaymentCompletedAt { get; set; }

    // Détails de la réservation
    public DateTime CheckInDate { get; set; }
    public DateTime CheckOutDate { get; set; }
    public int Adults { get; set; }
    public int Children { get; set; }
    public int Babies { get; set; }
    public int Nights { get; set; }
}
