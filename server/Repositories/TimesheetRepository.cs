using Microsoft.EntityFrameworkCore;
using Worker.Models;

namespace Worker.Repositories;

public class TimesheetRepository : Repository<Models.Timesheet>
{
    public TimesheetRepository(WorkerDbContext context)
        : base(context) { }

    public async Task<IEnumerable<Models.Timesheet>> GetTimesheetsByAssignmentIdAsync(
        int assignmentId
    )
    {
        return await _dbSet
            .Where(t => t.AssignmentId == assignmentId)
            .Include(t => t.Assignment)
            .ToListAsync();
    }

    public async Task<IEnumerable<Models.Timesheet>> GetTimesheetsByDateAsync(DateTime date)
    {
        return await _dbSet
            .Where(t => t.Date.Date == date.Date)
            .Include(t => t.Assignment)
            .ToListAsync();
    }

    public async Task<IEnumerable<Models.Timesheet>> GetTimesheetsByApprovalStatusAsync(
        bool approved
    )
    {
        return await _dbSet
            .Where(t => t.Approved == approved)
            .Include(t => t.Assignment)
            .ToListAsync();
    }

    public override async Task<Models.Timesheet?> GetByIdAsync(int id)
    {
        return await _dbSet.Include(t => t.Assignment).FirstOrDefaultAsync(t => t.Id == id);
    }
}
