using System;

namespace Core.Entities.Identity;

public class BookingData
{
    public int ListingId { get; set; }
    public DateTime CheckIn { get; set; }
    public DateTime CheckOut { get; set; }
    public int Guests { get; set; }
    public decimal Price { get; set; }
}
