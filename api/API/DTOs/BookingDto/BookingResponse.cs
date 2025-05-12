using System;
using Core.Entities;

namespace API.DTOs.BookingDto;

public class BookingResponse
{
    public int Id { get; set; }
    public int ListingId { get; set; }
    public string ListingTitle { get; set; } = null!;
    public string ListingPhotoUrl { get; set; } = null!;
    public string Location { get; set; } = null!;
    public DateTime CheckInDate { get; set; }
    public DateTime CheckOutDate { get; set; }
    public int GuestCount { get; set; }
    public double TotalPrice { get; set; }
    public string Currency { get; set; } = null!;
    public BookingStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
}
