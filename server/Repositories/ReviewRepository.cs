using Microsoft.EntityFrameworkCore;
using Worker.Models;

namespace Worker.Repositories;

public class ReviewRepository : Repository<Models.Review>
{
    public ReviewRepository(WorkerDbContext context)
        : base(context) { }

    public override async Task<Models.Review?> GetByIdAsync(int id)
    {
        return await _dbSet.FirstOrDefaultAsync(r => r.Id == id);
    }

    public async Task<IEnumerable<Models.Review>> GetReviewsByAuthorTypeAsync(
        ReviewAuthorType authorType
    )
    {
        return await _dbSet.Where(r => r.AuthorType == authorType).ToListAsync();
    }

    public async Task<IEnumerable<Models.Review>> GetReviewsByTargetIdAsync(int targetId)
    {
        return await _dbSet.Where(r => r.TargetId == targetId).ToListAsync();
    }
}
