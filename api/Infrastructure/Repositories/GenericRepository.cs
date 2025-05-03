using System;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class GenericRepository<T>(NzooContext context) : IGenericRepository<T> where T : BaseEntity
{
    public async Task<T> AddAsync(T entity)
    {
        try
        {
            await context.Set<T>().AddAsync(entity);
            await context.SaveChangesAsync();
            return entity;
        }
        catch (DbUpdateException ex)
        {

            var innerException = ex.InnerException != null
                    ? ex.InnerException.Message
                    : "No inner exception Details";

            throw new ApplicationException($"Error adding entity: {ex.Message}. Inner exception: {innerException}");
        }
    }


    public async Task DeleteAsync(T entity)
    {

        try
        {
            context.Set<T>().Remove(entity);
            await context.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            var innerException = ex.InnerException != null ? ex.InnerException.Message : "No inner exception details";
            throw new ApplicationException($"Failed to delete entity: {innerException}", ex);
        }
    }

    public async Task<IReadOnlyList<T>> GetAllAsync()
    {
        return await context.Set<T>().ToListAsync();
    }

    public async Task<T?> GetByIdAsync(int id)
    {
        return await context.Set<T>().FindAsync(id);
    }

    public async Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec)
    {
        return await ApplySpecification(spec).ToListAsync();
    }

    public async Task UpdateAsync(T entity)
    {
        try
        {
            context.Entry(entity).State = EntityState.Modified;
            await context.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            var innerException = ex.InnerException != null ? ex.InnerException.Message : "No inner exception details";
            throw new ApplicationException($"Failed to update entity: {innerException}", ex);
        }
    }

    public IQueryable<T> ApplySpecification(ISpecification<T> spec)
    {
        return SpecificationEvaluator<T>.GetQuery(context.Set<T>().AsQueryable(), spec);
    }
}
