using Microsoft.AspNetCore.Mvc;
using Worker.Models;
using Worker.Repositories;

namespace Worker.Controllers;

[ApiController]
[Route("api/assignments")]
public class AssignmentController : ControllerBase
{
    private readonly AssignmentRepository _repository;

    public AssignmentController(AssignmentRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Models.Assignment>>> GetAll()
    {
        var assignments = await _repository.GetAllAsync();
        return Ok(assignments);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Models.Assignment>> GetById(int id)
    {
        var assignment = await _repository.GetByIdAsync(id);
        if (assignment == null)
        {
            return NotFound();
        }
        return Ok(assignment);
    }

    [HttpGet("status/{status}")]
    public async Task<ActionResult<IEnumerable<Models.Assignment>>> GetByStatus(
        AssignmentStatus status
    )
    {
        var assignments = await _repository.GetAssignmentsByStatusAsync(status);
        return Ok(assignments);
    }

    [HttpGet("job/{jobId}")]
    public async Task<ActionResult<IEnumerable<Models.Assignment>>> GetByJobId(int jobId)
    {
        var assignments = await _repository.GetAssignmentsByJobIdAsync(jobId);
        return Ok(assignments);
    }

    [HttpGet("worker/{workerId}")]
    public async Task<ActionResult<IEnumerable<Models.Assignment>>> GetByWorkerId(int workerId)
    {
        var assignments = await _repository.GetAssignmentsByWorkerIdAsync(workerId);
        return Ok(assignments);
    }

    [HttpPost]
    public async Task<ActionResult<Models.Assignment>> Create(Models.Assignment assignment)
    {
        await _repository.AddAsync(assignment);
        await _repository.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = assignment.Id }, assignment);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Models.Assignment assignment)
    {
        if (id != assignment.Id)
        {
            return BadRequest();
        }

        var existingAssignment = await _repository.GetByIdAsync(id);
        if (existingAssignment == null)
        {
            return NotFound();
        }

        await _repository.UpdateAsync(assignment);
        await _repository.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var assignment = await _repository.GetByIdAsync(id);
        if (assignment == null)
        {
            return NotFound();
        }

        await _repository.DeleteAsync(id);
        await _repository.SaveChangesAsync();
        return NoContent();
    }
}
