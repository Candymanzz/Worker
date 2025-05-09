using Microsoft.EntityFrameworkCore;
using Worker.Models;

namespace Worker.Repositories;

public class ApplicationRepository : Repository<Models.Application>
{
    public ApplicationRepository(WorkerDbContext context)
        : base(context) { }

    public override async Task<IEnumerable<Models.Application>> GetAllAsync()
    {
        try
        {
            return await _dbSet
                .Include(a => a.Worker)
                .Include(a => a.Job)
                .ThenInclude(j => j.Employer)
                .AsNoTracking()
                .ToListAsync();
        }
        catch (Exception ex)
        {
            // Log the exception
            throw new Exception("Error loading applications", ex);
        }
    }

    public async Task<IEnumerable<Models.Application>> GetApplicationsByStatusAsync(
        ApplicationStatus status
    )
    {
        return await _dbSet
            .Where(a => a.Status == status)
            .Include(a => a.Worker)
            .Include(a => a.Job)
            .ThenInclude(j => j.Employer)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<IEnumerable<Models.Application>> GetApplicationsByJobIdAsync(int jobId)
    {
        return await _dbSet
            .Where(a => a.JobId == jobId)
            .Include(a => a.Worker)
            .Include(a => a.Job)
            .ThenInclude(j => j.Employer)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<IEnumerable<Models.Application>> GetApplicationsByWorkerIdAsync(int workerId)
    {
        return await _dbSet
            .Where(a => a.WorkerId == workerId)
            .Include(a => a.Worker)
            .Include(a => a.Job)
            .ThenInclude(j => j.Employer)
            .AsNoTracking()
            .ToListAsync();
    }

    public override async Task<Models.Application?> GetByIdAsync(int id)
    {
        return await _dbSet
            .Include(a => a.Worker)
            .Include(a => a.Job)
            .ThenInclude(j => j.Employer)
            .AsNoTracking()
            .FirstOrDefaultAsync(a => a.Id == id);
    }
}
