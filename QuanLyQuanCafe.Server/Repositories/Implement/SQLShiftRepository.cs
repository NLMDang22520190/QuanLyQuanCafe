using QuanLyQuanCafe.Server.Models;
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
    }
}

public class ShiftTimeDistribution
{
    public string Period { get; set; }
    public int ShiftCount { get; set; }
}