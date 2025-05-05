using Microsoft.EntityFrameworkCore;
using Worker.Models;

namespace Worker.Repositories;

public class ApplicationRepository : Repository<Models.Application>
{
    public ApplicationRepository(WorkerDbContext context)
        : base(context) { }

    public async Task<IEnumerable<Models.Application>> GetApplicationsByStatusAsync(
        ApplicationStatus status
    )
    {
        return await _dbSet
            .Where(a => a.Status == status)
            .Include(a => a.Job)
            .Include(a => a.Worker)
            .ToListAsync();
    }

    public async Task<IEnumerable<Models.Application>> GetApplicationsByJobIdAsync(int jobId)
    {
        return await _dbSet
            .Where(a => a.JobId == jobId)
            .Include(a => a.Job)
            .Include(a => a.Worker)
            .ToListAsync();
    }

    public async Task<IEnumerable<Models.Application>> GetApplicationsByWorkerIdAsync(int workerId)
    {
        return await _dbSet
            .Where(a => a.WorkerId == workerId)
            .Include(a => a.Job)
            .Include(a => a.Worker)
            .ToListAsync();
    }

    public override async Task<Models.Application?> GetByIdAsync(int id)
    {
        return await _dbSet
            .Include(a => a.Job)
            .Include(a => a.Worker)
            .FirstOrDefaultAsync(a => a.Id == id);
    }
}
