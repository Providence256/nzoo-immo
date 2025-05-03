using System;
using Core.Entities;
using Core.Interfaces;

namespace Infrastructure;

public interface IGenericRepository<T> where T : BaseEntity
{
    Task<T?> GetByIdAsync(int id);
    Task<IReadOnlyList<T>> GetAllAsync();
    Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec);
    IQueryable<T> ApplySpecification(ISpecification<T> spec);
    Task<T> AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(T entity);
}



