using Microsoft.EntityFrameworkCore;
using Worker.Models;

namespace Worker.Repositories;

public class JobRepository : Repository<Models.Job>
{
    public JobRepository(WorkerDbContext context)
        : base(context) { }

    public async Task<IEnumerable<Models.Job>> GetJobsByStatusAsync(JobStatus status)
    {
        return await _dbSet.Where(j => j.Status == status).Include(j => j.Employer).ToListAsync();
    }

    public async Task<IEnumerable<Models.Job>> GetJobsByLocationAsync(string location)
    {
        return await _dbSet
            .Where(j => j.Location == location)
            .Include(j => j.Employer)
            .ToListAsync();
    }

    public override async Task<Models.Job?> GetByIdAsync(int id)
    {
        return await _dbSet.Include(j => j.Employer).FirstOrDefaultAsync(j => j.Id == id);
    }
}
