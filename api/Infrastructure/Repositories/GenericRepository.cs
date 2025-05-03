using System;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class GenericRepository<T>(NzooContext context) : IGenericRepository<T> where T : BaseEntity
{
    public async Task<T> AddAsync(T entity)
    {
        await context.Set<T>().AddAsync(entity);
        await context.SaveChangesAsync();
        return entity;
    }

    public async Task DeleteAsync(T entity)
    {
        context.Set<T>().Remove(entity);
        await context.SaveChangesAsync();
    }

    public async Task<IReadOnlyList<T>> GetAllAsync()
    {
        return await context.Set<T>().ToListAsync();
    }

    public async Task<T?> GetByIdAsync(int id)
    {
        return await context.Set<T>().FindAsync(id);
    }

    public async Task UpdateAsync(T entity)
    {
        context.Set<T>().Update(entity);
        await context.SaveChangesAsync();
    }
}
