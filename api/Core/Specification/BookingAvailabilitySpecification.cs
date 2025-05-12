using System;
using Core.Entities;

namespace Core.Specification;

public class BookingAvailabilitySpecification : BaseSpecification<BookingAvailability>
{
    public BookingAvailabilitySpecification()
    {
        AddInclude(x => x.Listing!);
    }

    public BookingAvailabilitySpecification(int id) : base(x => x.Id == id)
    {
        AddInclude(x => x.Listing!);
    }

    public BookingAvailabilitySpecification(int listingId, bool forListing)
        : base(x => x.ListingId == listingId)
    {
        AddInclude(x => x.Listing!);
    }

    public BookingAvailabilitySpecification(int listingId, DateTime startDate, DateTime endDate)
        : base(x => x.ListingId == listingId &&
                   x.BlockedDate >= startDate &&
                   x.BlockedDate <= endDate &&
                   x.IsBlocked)
    {
    }

    public BookingAvailabilitySpecification(int listingId, DateTime date)
        : base(x => x.ListingId == listingId &&
                   x.BlockedDate.Date == date.Date &&
                   x.IsBlocked)
    {
    }
}