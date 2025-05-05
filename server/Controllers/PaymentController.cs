using Microsoft.AspNetCore.Mvc;
using Worker.Models;
using Worker.Repositories;

namespace Worker.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentController : ControllerBase
{
    private readonly PaymentRepository _repository;

    public PaymentController(PaymentRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Models.Payment>>> GetAll()
    {
        var payments = await _repository.GetAllAsync();
        return Ok(payments);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Models.Payment>> GetById(int id)
    {
        var payment = await _repository.GetByIdAsync(id);
        if (payment == null)
        {
            return NotFound();
        }
        return Ok(payment);
    }

    [HttpGet("assignment/{assignmentId}")]
    public async Task<ActionResult<IEnumerable<Models.Payment>>> GetByAssignmentId(int assignmentId)
    {
        var payments = await _repository.GetPaymentsByAssignmentIdAsync(assignmentId);
        return Ok(payments);
    }

    [HttpGet("status/{status}")]
    public async Task<ActionResult<IEnumerable<Models.Payment>>> GetByStatus(PaymentStatus status)
    {
        var payments = await _repository.GetPaymentsByStatusAsync(status);
        return Ok(payments);
    }

    [HttpGet("date-range")]
    public async Task<ActionResult<IEnumerable<Models.Payment>>> GetByDateRange(
        [FromQuery] DateTime startDate,
        [FromQuery] DateTime endDate
    )
    {
        var payments = await _repository.GetPaymentsByDateRangeAsync(startDate, endDate);
        return Ok(payments);
    }

    [HttpPost]
    public async Task<ActionResult<Models.Payment>> Create(Models.Payment payment)
    {
        await _repository.AddAsync(payment);
        await _repository.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = payment.Id }, payment);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Models.Payment payment)
    {
        if (id != payment.Id)
        {
            return BadRequest();
        }

        var existingPayment = await _repository.GetByIdAsync(id);
        if (existingPayment == null)
        {
            return NotFound();
        }

        await _repository.UpdateAsync(payment);
        await _repository.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var payment = await _repository.GetByIdAsync(id);
        if (payment == null)
        {
            return NotFound();
        }

        await _repository.DeleteAsync(id);
        await _repository.SaveChangesAsync();
        return NoContent();
    }
}
