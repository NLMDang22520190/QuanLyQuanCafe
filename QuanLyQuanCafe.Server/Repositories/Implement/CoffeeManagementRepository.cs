﻿using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using QuanLyQuanCafe.Server.Models;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class CoffeeManagementRepository<T> : ICoffeeManagementRepository<T> where T : class
    {
        private readonly CoffeeManagementContext dbContext;
        private DbSet<T> _dbSet;
        public CoffeeManagementRepository(CoffeeManagementContext dbContext)
        {
            this.dbContext = dbContext;
            _dbSet = dbContext.Set<T>();
        }
        public async Task<T> CreateAsync(T dbRecord)
        {
            await _dbSet.AddAsync(dbRecord);
            await dbContext.SaveChangesAsync();
            return dbRecord;
        }
        public async Task<T> DeleteAsync(Expression<Func<T, bool>> filter)
        {
            var existingRecord = await _dbSet.FirstOrDefaultAsync(filter);
            if (existingRecord == null)
            {
                return null;
            }

            _dbSet.Remove(existingRecord);
            await dbContext.SaveChangesAsync();
            return existingRecord;
        }
        public async Task<List<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }
        public async Task<T> GetByIdAsync(Expression<Func<T, bool>> filter)
        {
            return await _dbSet.FirstOrDefaultAsync(filter);
        }

        public async Task<T> UpdateAsync(Expression<Func<T, bool>> filter, Action<T> UpdateRecord)
        {
            var existingRecord = _dbSet.FirstOrDefault(filter);
            if (existingRecord == null)
            {
                return null;
            }

            //Only Change Body and UpdateAt
            UpdateRecord(existingRecord);

            await dbContext.SaveChangesAsync();
            return existingRecord;
        }
    }
}
