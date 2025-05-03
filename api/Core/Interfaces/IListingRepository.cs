using System;
using Core.Entities;
using Infrastructure;

namespace Core.Interfaces;

public interface IListingRepository : IGenericRepository<Listing>
{
    Task<Listing?> GetListingByIdWithDetailsAsync(int id);
    Task<IReadOnlyList<Listing>> GetListingsByVilleAsync(int villeId);
    Task<IReadOnlyList<Listing>> GetListingsByCommuneAsync(int communeId);
}
