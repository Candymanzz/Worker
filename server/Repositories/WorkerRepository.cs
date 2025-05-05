using Microsoft.EntityFrameworkCore;
using Worker.Models;

namespace Worker.Repositories;

public class WorkerRepository : Repository<Models.Worker>
{
    public WorkerRepository(WorkerDbContext context)
        : base(context) { }

    public async Task<IEnumerable<Models.Worker>> GetWorkersByAvailabilityAsync(string availability)
    {
        return await _dbSet
            .Where(w => w.Availability == availability)
            .Include(w => w.Applications)
            .Include(w => w.Assignments)
            .ToListAsync();
    }

    public async Task<IEnumerable<Models.Worker>> GetWorkersWithSkillsAsync(string skill)
    {
        return await _dbSet
            .Where(w => w.Skills != null && w.Skills.Contains(skill))
            .Include(w => w.Applications)
            .Include(w => w.Assignments)
            .ToListAsync();
    }

    public override async Task<Models.Worker?> GetByIdAsync(int id)
    {
        return await _dbSet
            .Include(w => w.Applications)
            .Include(w => w.Assignments)
            .Include(w => w.ReviewsAsAuthor)
            .FirstOrDefaultAsync(w => w.Id == id);
    }
}
