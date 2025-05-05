using Microsoft.EntityFrameworkCore;
using Worker.Models;

namespace Worker.Repositories;

public class AssignmentRepository : Repository<Models.Assignment>
{
    public AssignmentRepository(WorkerDbContext context)
        : base(context) { }

    public async Task<IEnumerable<Models.Assignment>> GetAssignmentsByStatusAsync(
        AssignmentStatus status
    )
    {
        return await _dbSet
            .Where(a => a.Status == status)
            .Include(a => a.Job)
            .Include(a => a.Worker)
            .Include(a => a.Timesheets)
            .Include(a => a.Payments)
            .ToListAsync();
    }

    public async Task<IEnumerable<Models.Assignment>> GetAssignmentsByJobIdAsync(int jobId)
    {
        return await _dbSet
            .Where(a => a.JobId == jobId)
            .Include(a => a.Job)
            .Include(a => a.Worker)
            .Include(a => a.Timesheets)
            .Include(a => a.Payments)
            .ToListAsync();
    }

    public async Task<IEnumerable<Models.Assignment>> GetAssignmentsByWorkerIdAsync(int workerId)
    {
        return await _dbSet
            .Where(a => a.WorkerId == workerId)
            .Include(a => a.Job)
            .Include(a => a.Worker)
            .Include(a => a.Timesheets)
            .Include(a => a.Payments)
            .ToListAsync();
    }

    public override async Task<Models.Assignment?> GetByIdAsync(int id)
    {
        return await _dbSet
            .Include(a => a.Job)
            .Include(a => a.Worker)
            .Include(a => a.Timesheets)
            .Include(a => a.Payments)
            .FirstOrDefaultAsync(a => a.Id == id);
    }
}
