using API.DTOs.ListingDto;
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
        IGenericRepository<ListingRule> listingRuleRepo,
        IGenericRepository<ListingPrice> listingPriceRepo,
        IGenericRepository<ListingPhoto> listingPhotoRepo,
        IGenericRepository<ListingLocation> listingLocRepo,
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


        [HttpPost]
        public async Task<IActionResult> CreateListing(ListingRequest request)
        {
            if (request == null) return BadRequest("Listing cannot be null");

            var listing = new Listing
            {
                Title = request.Title,
                Description = request.Description,
                TypeHebergementId = request.TypeHebergementId,
                NbreVisiteurs = request.NbreVisiteurs,
                NbreChambres = request.NbreChambres,
                NbreDouches = request.NbreDouches,
                NbreLits = request.NbreLits,
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
                Reduction = request.Reduction,
                ReductionHebdo = request.ReductionHebdo,
                ReductionMensu = request.ReductionMensu,
                FraisMenage = request.FraisMenage,
                PersoSuppl = request.PersoSuppl,
                ListingId = listing.Id
            };

            await listingPriceRepo.AddAsync(price);

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

            if (request.Rules != null && request.Rules.Any())
            {
                foreach (var rule in request.Rules)
                {
                    var listingRule = new ListingRule
                    {
                        RuleId = rule.RuleId,
                        ListingId = listing.Id
                    };
                    await listingRuleRepo.AddAsync(listingRule);
                }
            }

            if (request.Photos != null && request.Photos.Any())
            {
                foreach (var photo in request.Photos)
                {
                    var photoUrl = await photoService.AddPhotoAsync(photo);
                    if (photoUrl.Error != null)
                        return BadRequest("Photo upload failed");

                    var listingPhoto = new ListingPhoto
                    {
                        PhotoUrl = photoUrl.SecureUrl.AbsoluteUri,
                        ListingId = listing.Id
                    };
                    await listingPhotoRepo.AddAsync(listingPhoto);
                }
            }

            return CreatedAtAction("GetListings", new { id = listing.Id }, listing);
        }

    }
}
