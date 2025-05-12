using System;
using API.DTOs.BookingDto;
using Core.Entities;
using Core.Interfaces;
using Infrastructure;

namespace API.Services;

public class BookingService : IBookingService
{
    private readonly IBookingRepository bookingRepository;
    private readonly IBookingAvailabilityRepository bookingAvailabilityRepository;
    private readonly IGenericRepository<Listing> listingRepo;
    private readonly IGenericRepository<ListingPrice> priceRepo;

    public BookingService(
        IBookingRepository bookingRepository,
        IBookingAvailabilityRepository bookingAvailabilityRepository,
        IGenericRepository<Listing> listingRepo,
        IGenericRepository<ListingPrice> priceRepo

      )
    {
        this.bookingRepository = bookingRepository;
        this.bookingAvailabilityRepository = bookingAvailabilityRepository;
        this.listingRepo = listingRepo;
        this.priceRepo = priceRepo;
    }

    public async Task<bool> BlockDateAsync(BlockDateRequest request, int hostId)
    {
        var existingBlock = await bookingAvailabilityRepository.GetBlockedDateAsync(request.ListingId, request.BlockedDate);

        if (existingBlock != null)
        {
            return true;
        }

        bool hasBooking = await bookingRepository.CheckBookingOverlapAsync(
            request.ListingId, request.BlockedDate, request.BlockedDate.AddDays(1)
        );

        if (hasBooking)
        {
            throw new InvalidOperationException("Cannot block a date that has existing booking");
        }

        var blockDate = new BookingAvailability
        {
            ListingId = request.ListingId,
            BlockedDate = request.BlockedDate.Date,
            IsBlocked = true,
            Reason = request.Reason
        };

        await bookingAvailabilityRepository.AddAsync(blockDate);

        return true;
    }

    public async Task<bool> CancelBookingStatusAsync(int bookingId, int userId, string reason)
    {
        var booking = await bookingRepository.GetBookingByIdWithDetailsAsync(bookingId);

        if (booking == null)
        {
            throw new ArgumentException($"Booking with ID {bookingId} not found");
        }

        if (booking.UserId != userId)
        {
            throw new UnauthorizedAccessException("You are not authorized to cancel this booking");
        }

        if (booking.Status != BookingStatus.Pending && booking.Status != BookingStatus.Confirmed)
        {
            throw new InvalidOperationException($"Cannot cancel a booking with status {booking.Status}");
        }

        booking.Status = BookingStatus.Cancelled;
        booking.CancellationReason = reason;
        booking.CancellationDate = DateTime.UtcNow;
        booking.UpdatedAt = DateTime.UtcNow;

        await bookingRepository.UpdateAsync(booking);

        return true;
    }

    public async Task<AvailabilityCheckResponse> CheckAvailabilityAsync(AvailabilityCheckRequest request)
    {
        if (request.CheckOutDate <= request.CheckInDate)
        {
            throw new ArgumentException("Check-out date must be after check-in date");
        }

        var listing = await listingRepo.GetByIdAsync(request.ListingId);

        if (listing == null)
        {
            throw new ArgumentException($"Listing with ID {request.ListingId} not found");
        }

        var listingPrice = await priceRepo.GetByIdAsync(listing.PriceId);
        if (listingPrice == null)
        {
            throw new ArgumentException($"Pricing information not found for listing {request.ListingId}");
        }

        if (request.GuestCount > listing.NbreVisiteurs)
        {
            throw new ArgumentException($"This listing can only accomodate {listing.NbreVisiteurs} guests");
        }

        bool hasOverlap = await bookingRepository.CheckBookingOverlapAsync(
            request.ListingId, request.CheckInDate, request.CheckOutDate);

        var blockedDates = await bookingAvailabilityRepository.GetBlockedDatesForListingAsync(
            request.ListingId, request.CheckInDate, request.CheckOutDate);

        var bookedDates = await bookingRepository.GetBookedDatesForListingAsync(
            request.ListingId, request.CheckInDate, request.CheckOutDate
        );


        var allUnavailableDates = blockedDates.Concat(bookedDates).Distinct().OrderBy(d => d).ToList();

        var unavailableDateRanges = new List<DateRange>();

        if (allUnavailableDates.Any())
        {
            var rangeStart = allUnavailableDates[0];
            var rangeEnd = rangeStart;

            for (int i = 1; i < allUnavailableDates.Count; i++)
            {
                if (allUnavailableDates[i] == rangeEnd.AddDays(1))
                {
                    rangeEnd = allUnavailableDates[i];
                }
                else
                {
                    unavailableDateRanges.Add(new DateRange { StartDate = rangeStart, EndDate = rangeEnd });
                    rangeStart = allUnavailableDates[i];
                    rangeEnd = rangeStart;
                }
            }

            unavailableDateRanges.Add(new DateRange { StartDate = rangeStart, EndDate = rangeEnd });
        }

        bool isAvailable = !hasOverlap && !blockedDates.Any();

        int nights = (int)(request.CheckOutDate - request.CheckInDate).TotalDays;

        double basePrice = listingPrice.PrixBase * nights;
        double cleaningFee = listingPrice.FraisMenage;
        double guestFee = 0;

        if (request.GuestCount > 1)
        {
            guestFee = listingPrice.PersoSuppl * (request.GuestCount - 1);
        }

        double discount = 0;
        if (nights >= 30 && listingPrice.ReductionMensu > 0)
        {
            discount = basePrice * (listingPrice.ReductionMensu / 100);
        }
        else if (nights >= 7 && listingPrice.ReductionHebdo > 0)
        {
            discount = basePrice * (listingPrice.ReductionHebdo / 100);
        }
        else if (listingPrice.Reduction > 0)
        {
            discount = basePrice * (listingPrice.Reduction / 100);
        }

        double totalPrice = basePrice + cleaningFee + guestFee - discount;

        var response = new AvailabilityCheckResponse
        {
            IsAvailable = isAvailable,
            TotalPrice = totalPrice,
            Currency = listingPrice.Devise?.Code ?? "USD",
            Nights = nights,
            BasePrice = basePrice,
            CleaningFee = cleaningFee,
            GuestFee = guestFee,
            Discount = discount,
            UnavailableDates = unavailableDateRanges
        };

        return response;
    }

    public async Task<Booking> CreateBooking(BookingRequest request, int userId)
    {
        var availabilityCheck = await CheckAvailabilityAsync(new AvailabilityCheckRequest
        {
            ListingId = request.ListingId,
            CheckInDate = request.CheckInDate,
            CheckOutDate = request.CheckOutDate,
            GuestCount = request.GuestCount
        });

        if (!availabilityCheck.IsAvailable)
        {
            throw new InvalidOperationException("The requested date are not available");
        }

        var booking = new Booking
        {
            ListingId = request.ListingId,
            UserId = userId,
            CheckInDate = request.CheckInDate,
            CheckOutDate = request.CheckOutDate,
            GuestCount = request.GuestCount,
            TotalPrice = availabilityCheck.TotalPrice,
            Status = BookingStatus.Pending
        };

        await bookingRepository.AddAsync(booking);
        return booking;
    }

    public Task<bool> UnblockDateAsync(int listingId, DateTime date, int hostId)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> UpdateBookingStatusAsync(int bookingId, BookingStatus status, string? reason = null)
    {
        var booking = await bookingRepository.GetByIdAsync(bookingId);

        if (booking == null)
        {
            throw new ArgumentException($"Booking with ID {bookingId} not found");
        }

        booking.Status = status;
        booking.UpdatedAt = DateTime.UtcNow;

        if (status == BookingStatus.Cancelled || status == BookingStatus.Rejected)
        {
            booking.CancellationReason = reason;
            booking.CancellationDate = DateTime.UtcNow;
        }

        await bookingRepository.UpdateAsync(booking);

        return true;
    }
}
