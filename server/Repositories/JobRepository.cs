using Microsoft.EntityFrameworkCore;
using Worker.Models;

namespace Worker.Repositories;

public class JobRepository : Repository<Models.Job>
{
    public JobRepository(WorkerDbContext context)
        : base(context) { }

    public async Task<IEnumerable<Models.Job>> GetJobsByStatusAsync(JobStatus status)
    {
        return await _dbSet
            .Where(j => j.Status == status)
            .Include(j => j.Employer)
            .Include(j => j.Applications)
            .Include(j => j.Assignments)
            .Include(j => j.RequiredSkills)
            .ToListAsync();
    }

    public async Task<IEnumerable<Models.Job>> GetJobsByLocationAsync(string location)
    {
        return await _dbSet
            .Where(j => j.Location == location)
            .Include(j => j.Employer)
            .Include(j => j.Applications)
            .Include(j => j.Assignments)
            .Include(j => j.RequiredSkills)
            .ToListAsync();
    }

    public override async Task<Models.Job?> GetByIdAsync(int id)
    {
        return await _dbSet
            .Include(j => j.Employer)
            .Include(j => j.Applications)
            .Include(j => j.Assignments)
            .Include(j => j.RequiredSkills)
            .FirstOrDefaultAsync(j => j.Id == id);
    }
}
