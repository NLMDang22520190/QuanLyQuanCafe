using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTO;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLShiftRepository : CoffeeManagementRepository<Shift>, IShiftRepository
    {
        private readonly CoffeeManagementContext _dbContext;

        public SQLShiftRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<PagedResult<ShiftDTO>> GetAllShift(int pageIndex, int pageSize)
        {
            var query = _dbContext.Shifts.Where(s => !s.IsDeleted);
            var totalRecords = await query.CountAsync();

            var shifts = await query
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            if (shifts == null || !shifts.Any())
            {
                return null;
            }

            var totalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);

            var shiftDtos = shifts.Select(s => new ShiftDTO
            {
                ShiftId = s.ShiftId,
                ShiftName = s.ShiftName?? "Unknown",
                StartTime = s.StartTime,
                EndTime = s.EndTime
            }).ToList();

            return new PagedResult<ShiftDTO>
            {
                TotalRecords = totalRecords,
                TotalPages = totalPages,
                CurrentPage = pageIndex,
                PageSize = pageSize,
                Data = shiftDtos
            };
        }
        public async Task<List<ShiftScheduleDto>> GetShiftsByStaffId (int staffId)
        {
            try
            {
                var shifts = await _dbContext.Schedules
                    .Where(s => s.StaffId == staffId && !s.Shift.IsDeleted)
                    .Select(s => new ShiftScheduleDto
                    {
                        ShiftId = s.Shift.ShiftId,
                        ShiftName = s.Shift.ShiftName,
                        StartTime = s.Shift.StartTime,
                        EndTime = s.Shift.EndTime,
                        StartDate = s.StartDate,  
                        EndDate = s.EndDate,
                        StaffId = staffId
                    })
                    .ToListAsync();

                if (shifts == null || !shifts.Any())
                {
                    throw new KeyNotFoundException($"No shifts found for staff with ID {staffId}.");
                }

                return shifts;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                throw new Exception("An error occurred while fetching shifts for the staff.");
            }
        }
        public IQueryable<ShiftTimeDistribution> GetShiftDistribution()
        {
            var morningStart = new TimeOnly(6, 0);
            var morningEnd = new TimeOnly(12, 0);
            var afternoonStart = new TimeOnly(12, 0);
            var afternoonEnd = new TimeOnly(18, 0);
            var eveningStart = new TimeOnly(18, 0);
            var eveningEnd = new TimeOnly(23, 59);


            var shiftDistribution = _dbContext.Shifts
           .Select(shift => new
           {
               shift.ShiftId,
               shift.ShiftName,
               shift.StartTime,
               shift.EndTime,
               Period = shift.StartTime >= morningStart && shift.EndTime <= morningEnd ? "Morning" :
                        shift.StartTime >= afternoonStart && shift.EndTime <= afternoonEnd ? "Afternoon" :
                        shift.StartTime >= eveningStart && shift.EndTime <= eveningEnd ? "Evening" : "Other"
           })
           .GroupBy(x => x.Period)
           .Select(g => new ShiftTimeDistribution
           {
               Period = g.Key,
               ShiftCount = g.Count()
           });

            return shiftDistribution;
        }
        public async Task<ShiftDTO> CreateShift(ShiftDTO shiftDto)
        {
            if (shiftDto == null)
            {
                throw new ArgumentNullException(nameof(shiftDto), "Shift details must be provided.");
            }

            var overlappingShift = await _dbContext.Shifts
                .Where(s =>
                    (s.IsDeleted == false &&shiftDto.StartTime <= s.EndTime && shiftDto.EndTime >= s.StartTime ) 
                )
                .FirstOrDefaultAsync();

            if (overlappingShift != null)
            {
                throw new InvalidOperationException($"Shift overlaps with an existing shift: {overlappingShift.ShiftName} (Start: {overlappingShift.StartTime}, End: {overlappingShift.EndTime})");
            }

            var shift = new Shift
            {
                ShiftName = shiftDto.ShiftName,
                StartTime = shiftDto.StartTime,
                EndTime = shiftDto.EndTime
            };

            await _dbContext.Shifts.AddAsync(shift);
            await _dbContext.SaveChangesAsync();

            return new ShiftDTO
            {
                ShiftId = shift.ShiftId,
                ShiftName = shift.ShiftName,
                StartTime = shift.StartTime,
                EndTime = shift.EndTime
            };
        }
        public async Task<ShiftDTO> UpdateShift(int shiftId, ShiftDTO shiftDto)
        {
            if (shiftDto == null)
            {
                throw new ArgumentNullException(nameof(shiftDto), "Shift details must be provided.");
            }

            var existingShift = await _dbContext.Shifts.FindAsync(shiftId);
            if (existingShift == null)
            {
                throw new KeyNotFoundException($"Shift with ID {shiftId} not found.");
            }

            var overlappingShift = await _dbContext.Shifts
                .Where(s => s.ShiftId != shiftId) 
                .Where(s =>
                    (s.IsDeleted==false && shiftDto.StartTime < s.EndTime && shiftDto.EndTime > s.StartTime) 
                )
                .FirstOrDefaultAsync();

            if (overlappingShift != null)
            {
                throw new InvalidOperationException($"Shift overlaps with an existing shift: {overlappingShift.ShiftName} (Start: {overlappingShift.StartTime}, End: {overlappingShift.EndTime})");
            }

            existingShift.ShiftName = shiftDto.ShiftName;
            existingShift.StartTime = shiftDto.StartTime;
            existingShift.EndTime = shiftDto.EndTime;

            _dbContext.Shifts.Update(existingShift);
            await _dbContext.SaveChangesAsync();

            return new ShiftDTO
            {
                ShiftId = existingShift.ShiftId,
                ShiftName = existingShift.ShiftName,
                StartTime = existingShift.StartTime,
                EndTime = existingShift.EndTime
            };
        }

        public async Task<bool> SoftDeleteShift(int shiftId)
        {
            var shift = await _dbContext.Shifts.FindAsync(shiftId);
            if (shift == null)
                throw new KeyNotFoundException($"Shift with ID {shiftId} not found.");

            var hasActiveSchedules = await _dbContext.Schedules
                .AnyAsync(schedule => schedule.ShiftId == shiftId && schedule.EndDate >= DateOnly.FromDateTime(DateTime.Now));

            if (hasActiveSchedules)
                throw new InvalidOperationException($"Cannot delete shift with ID {shiftId} because it has active schedules.");

            shift.IsDeleted = true;
            await _dbContext.SaveChangesAsync();

            return true;
        }

    }
}

public class ShiftTimeDistribution
{
    public string Period { get; set; }
    public int ShiftCount { get; set; }
}