using System;
using Core.Entities;

namespace Core.Specification;

public class BookingSpecification : BaseSpecification<Booking>
{
    public BookingSpecification()
    {
        AddInclude(x => x.Listing!);
        AddInclude("Listing.Photos");
        AddInclude("Listing.Location");
        AddInclude("Listing.Location.Ville");
        AddInclude("Listing.Location.Commune");
        AddInclude("Listing.Price");
        AddInclude("Listing.Price.Devise");
        AddInclude(x => x.User!);
    }

    public BookingSpecification(int id) : base(x => x.Id == id)
    {
        AddInclude(x => x.Listing!);
        AddInclude("Listing.Photos");
        AddInclude("Listing.Location");
        AddInclude("Listing.Location.Ville");
        AddInclude("Listing.Location.Commune");
        AddInclude("Listing.Price");
        AddInclude("Listing.Price.Devise");
        AddInclude(x => x.User!);
    }

    public BookingSpecification(int userId, bool forUser)
        : base(x => x.UserId == userId)
    {
        AddInclude(x => x.Listing!);
        AddInclude("Listing.Photos");
        AddInclude("Listing.Location");
        AddInclude("Listing.Location.Ville");
        AddInclude("Listing.Location.Commune");
        AddInclude("Listing.Price");
        AddInclude("Listing.Price.Devise");
    }

    // public BookingSpecification(int listingId, bool forListing) 
    //     : base(x => x.ListingId == listingId)
    // {
    //     AddInclude(x => x.User!);
    //     AddInclude(x => x.Listing!);
    //     AddInclude("Listing.Price");
    //     AddInclude("Listing.Price.Devise");
    // }

    public BookingSpecification(int listingId, DateTime checkInDate, DateTime checkOutDate, int? excludeBookingId = null)
        : base(x => x.ListingId == listingId &&
                    x.Status != BookingStatus.Cancelled &&
                    x.Status != BookingStatus.Rejected &&
                    ((x.CheckInDate <= checkOutDate && x.CheckOutDate >= checkInDate) ||
                     (x.CheckInDate >= checkInDate && x.CheckInDate < checkOutDate) ||
                     (x.CheckOutDate > checkInDate && x.CheckOutDate <= checkOutDate)) &&
                    (excludeBookingId == null || x.Id != excludeBookingId))
    {
    }
}