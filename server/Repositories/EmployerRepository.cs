using Microsoft.EntityFrameworkCore;
using Worker.Models;

namespace Worker.Repositories;

public class EmployerRepository : Repository<Models.Employer>
{
    public EmployerRepository(WorkerDbContext context)
        : base(context) { }

    public async Task<IEnumerable<Models.Employer>> GetEmployersByIndustryAsync(string industry)
    {
        return await _dbSet
            .Where(e => e.Industry == industry)
            .Include(e => e.Jobs)
            .Include(e => e.ReviewsAsAuthor)
            .ToListAsync();
    }

    public override async Task<Models.Employer?> GetByIdAsync(int id)
    {
        return await _dbSet
            .Include(e => e.Jobs)
            .Include(e => e.ReviewsAsAuthor)
            .FirstOrDefaultAsync(e => e.Id == id);
    }
}
