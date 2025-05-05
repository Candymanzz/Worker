using Microsoft.EntityFrameworkCore;
using Worker.Models;

namespace Worker.Repositories;

public class PaymentRepository : Repository<Models.Payment>
{
    public PaymentRepository(WorkerDbContext context)
        : base(context) { }

    public async Task<IEnumerable<Models.Payment>> GetPaymentsByAssignmentIdAsync(int assignmentId)
    {
        return await _dbSet
            .Where(p => p.AssignmentId == assignmentId)
            .Include(p => p.Assignment)
            .ToListAsync();
    }

    public async Task<IEnumerable<Models.Payment>> GetPaymentsByStatusAsync(PaymentStatus status)
    {
        return await _dbSet.Where(p => p.Status == status).Include(p => p.Assignment).ToListAsync();
    }

    public async Task<IEnumerable<Models.Payment>> GetPaymentsByDateRangeAsync(
        DateTime startDate,
        DateTime endDate
    )
    {
        return await _dbSet
            .Where(p => p.PaymentDate >= startDate && p.PaymentDate <= endDate)
            .Include(p => p.Assignment)
            .ToListAsync();
    }

    public override async Task<Models.Payment?> GetByIdAsync(int id)
    {
        return await _dbSet.Include(p => p.Assignment).FirstOrDefaultAsync(p => p.Id == id);
    }
}
