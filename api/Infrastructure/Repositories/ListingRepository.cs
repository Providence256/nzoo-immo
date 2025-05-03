using System;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class ListingRepository : GenericRepository<Listing>, IListingRepository
{
    private readonly NzooContext _context;

    public ListingRepository(NzooContext context) : base(context)
    {
        _context = context;
    }

    public async Task<Listing?> GetListingByIdWithDetailsAsync(int id)
    {
        return await _context.Listings
             .Include(l => l.TypeHebergement)
             .Include(l => l.Price)
                 .ThenInclude(p => p!.Devise)
             .Include(l => l.Location)
                 .ThenInclude(loc => loc!.Ville)
             .Include(l => l.Location)
                 .ThenInclude(loc => loc!.Commune)
             .Include(l => l.Equipements)
                 .ThenInclude(e => e.Equipement)
             .Include(l => l.Photos)
             .Include(l => l.Rules)
                 .ThenInclude(r => r.Rule)
             .FirstOrDefaultAsync(l => l.Id == id);
    }

    public async Task<IReadOnlyList<Listing>> GetListingsByCommuneAsync(int communeId)
    {
        return await _context.Listings
            .Include(l => l.Location)
            .Include(l => l.Photos.Take(1))
            .Include(l => l.Price)
                .ThenInclude(p => p!.Devise)
            .Where(l => l.Location!.CommuneId == communeId)
            .ToListAsync();

    }

    public async Task<IReadOnlyList<Listing>> GetListingsByVilleAsync(int villeId)
    {
        return await _context.Listings
            .Include(l => l.Location)
            .Include(l => l.Photos.Take(1))
            .Include(l => l.Price)
                .ThenInclude(p => p!.Devise)
            .Where(l => l.Location!.VilleId == villeId)
            .ToListAsync();
    }
}
