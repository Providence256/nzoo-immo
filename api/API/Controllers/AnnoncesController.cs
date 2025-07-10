using API.DTOs.ListingDto;
using API.Helpers;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnnoncesController(IGenericRepository<Listing> listingRepo,
        IGenericRepository<ListingEquipement> listingEquiRepo,
        IGenericRepository<ListingPrice> listingPriceRepo,
        IGenericRepository<ListingPhoto> listingPhotoRepo,
        IGenericRepository<ListingLocation> listingLocRepo,
        IGenericRepository<ListingBathroomType> listingBathroomTypeRepo,
        IGenericRepository<ListingDiscount> listingDiscountRepo,
        IGenericRepository<Ville> villeRepo,
        IPhotoService photoService,
        IMapper mapper) : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<List<ListingResponse>>> GetListings()
        {
            var spec = new ListingSpecification();
            var listings = await listingRepo.ApplySpecification(spec)
                            .ProjectTo<ListingResponse>(mapper.ConfigurationProvider)
                            .ToListAsync();
            return Ok(listings);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ListingResponse>> GetListing(int id)
        {
            var spec = new ListingSpecification(id);
            var listing = await listingRepo.ApplySpecification(spec)
                            .ProjectTo<ListingResponse>(mapper.ConfigurationProvider)
                            .FirstOrDefaultAsync(x => x.Id == id);
            return Ok(listing);
        }


        [HttpGet("listing-by-ville/{villeId:int}")]
        public async Task<ActionResult<ListingResponse>> GetAllListingByVille(int villeId)
        {
            var ville = await villeRepo.GetByIdAsync(villeId);

            if (ville == null) return NotFound($"la ville avec l'ID {villeId} n'existe pas.");

            var spec = new ListingSpecification(villeId, true);

            var listings = await listingRepo.ApplySpecification(spec)
                                        .ProjectTo<ListingResponse>(mapper.ConfigurationProvider)
                                        .ToListAsync();

            return Ok(listings);
        }

        [HttpGet("average-price/{villeId:int}")]
        public async Task<ActionResult<decimal>> GetAveragePriceByVille(int villeId)
        {
            var ville = await villeRepo.GetByIdAsync(villeId);

            if (ville == null) return NotFound("Ville inexistante");

            var spec = new ListingSpecification(villeId, true);
            var listings = await listingRepo.ApplySpecification(spec).ToListAsync();

            if (!listings.Any()) return Ok(0);

            var prices = await listingPriceRepo.GetAllAsync();
            var averagePrice = listings.Join(prices, l => l.Id, p => p.ListingId, (l, p) => p.PrixBase)
                                       .DefaultIfEmpty(0).Average();

            return Ok(Math.Round(averagePrice, 2));
        }

        [HttpPost]
        public async Task<IActionResult> CreateListing(ListingRequest request)
        {
            if (request == null) return BadRequest("Listing cannot be null");

            var userId = User.GetUserId();

            var listing = new Listing
            {
                Title = request.Title,
                Description = request.Description,
                TypeHebergementId = request.TypeHebergementId,
                SousTypeHebergementId = request.SousTypeHebergementId,
                WhoElseOnSite = request.WhoElseOnSite,
                NbreVisiteurs = request.NbreVisiteurs,
                NbreChambres = request.NbreChambres,
                NbreLits = request.NbreLits,
                Status = ListingStatus.Processing,
                UserId = userId,
            };

            await listingRepo.AddAsync(listing);

            var location = new ListingLocation
            {
                VilleId = request.VilleId,
                CommuneId = request.CommuneId,
                Quartier = request.Quartier,
                Avenue = request.Avenue,
                NumeroDomicile = request.NumeroDomicile,
                ListingId = listing.Id
            };

            await listingLocRepo.AddAsync(location);

            var price = new ListingPrice
            {
                DeviseId = request.DeviseId,
                PrixBase = request.PrixBase,
                ListingId = listing.Id
            };

            await listingPriceRepo.AddAsync(price);

            if (request.BathroomTypes != null && request.BathroomTypes.Any())
            {
                foreach (var bathroomType in request.BathroomTypes.Where(bt => bt.Count > 0))
                {
                    var listingBathroomType = new ListingBathroomType
                    {
                        BathroomTypeId = bathroomType.BathroomTypeId,
                        Count = bathroomType.Count,
                        ListingId = listing.Id
                    };

                    await listingBathroomTypeRepo.AddAsync(listingBathroomType);
                }
            }

            if (request.Equipements != null && request.Equipements.Any())
            {
                foreach (var equipement in request.Equipements)
                {
                    var listingEquipement = new ListingEquipement
                    {
                        EquipementId = equipement.EquipementId,
                        ListingId = listing.Id
                    };
                    await listingEquiRepo.AddAsync(listingEquipement);
                }
            }

            if (request.DiscountsIds != null && request.DiscountsIds.Any())
            {
                foreach (var discountId in request.DiscountsIds)
                {
                    var listingDiscount = new ListingDiscount
                    {
                        DiscountId = discountId,
                        ListingId = listing.Id
                    };
                    await listingDiscountRepo.AddAsync(listingDiscount);
                }
            }

            if (request.Photos != null && request.Photos.Any())
            {


                try
                {
                    var uploadResults = await Task.WhenAll(
                        request.Photos.Select(photo => photoService.AddPhotoAsync(photo))
                    );

                    foreach (var result in uploadResults)
                    {
                        if (result.Error != null)
                            return BadRequest("Echec de l'upload d'une photo");

                        var listingPhoto = new ListingPhoto
                        {
                            PhotoUrl = result.SecureUrl.AbsoluteUri,
                            ListingId = listing.Id
                        };

                        await listingPhotoRepo.AddAsync(listingPhoto);
                    }


                }
                catch (Exception ex)
                {

                    return BadRequest($"Photo upload failed: {ex.Message}");
                }
            }

            return CreatedAtAction("GetListings", new { id = listing.Id }, listing);
        }


        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteAnnonce(int id)
        {
            var annonce = await listingRepo.GetByIdAsync(id);
            if (annonce == null) return NotFound();

            await listingRepo.DeleteAsync(annonce);

            return NoContent();
        }

    }



}
