using System;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class CommuneRepository : GenericRepository<Commune>, ICommuneRepository
{
    private readonly NzooContext _context;
    public CommuneRepository(NzooContext context) : base(context)
    {
        _context = context;
    }

    public async Task<Commune?> GetCommunesWithVilleAsync(int id)
    {
        return await _context.Communes
            .Include(c => c.Ville)
            .FirstOrDefaultAsync(c => c.Id == id);
    }
}
