using System;
using Core.Entities;
using Infrastructure;

namespace Core.Interfaces;

public interface ICommuneRepository : IGenericRepository<Commune>
{
    Task<Commune?> GetCommunesWithVilleAsync(int id);
}
