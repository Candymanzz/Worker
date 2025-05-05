using Microsoft.AspNetCore.Mvc;
using Worker.Models;
using Worker.Repositories;

namespace Worker.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WorkerController : ControllerBase
{
    private readonly WorkerRepository _repository;

    public WorkerController(WorkerRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Models.Worker>>> GetAll()
    {
        var workers = await _repository.GetAllAsync();
        return Ok(workers);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Models.Worker>> GetById(int id)
    {
        var worker = await _repository.GetByIdAsync(id);
        if (worker == null)
        {
            return NotFound();
        }
        return Ok(worker);
    }

    [HttpGet("availability/{availability}")]
    public async Task<ActionResult<IEnumerable<Models.Worker>>> GetByAvailability(
        string availability
    )
    {
        var workers = await _repository.GetWorkersByAvailabilityAsync(availability);
        return Ok(workers);
    }

    [HttpGet("skills/{skill}")]
    public async Task<ActionResult<IEnumerable<Models.Worker>>> GetBySkills(string skill)
    {
        var workers = await _repository.GetWorkersWithSkillsAsync(skill);
        return Ok(workers);
    }

    [HttpPost]
    public async Task<ActionResult<Models.Worker>> Create(Models.Worker worker)
    {
        await _repository.AddAsync(worker);
        await _repository.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = worker.Id }, worker);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Models.Worker worker)
    {
        if (id != worker.Id)
        {
            return BadRequest();
        }

        var existingWorker = await _repository.GetByIdAsync(id);
        if (existingWorker == null)
        {
            return NotFound();
        }

        await _repository.UpdateAsync(worker);
        await _repository.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var worker = await _repository.GetByIdAsync(id);
        if (worker == null)
        {
            return NotFound();
        }

        await _repository.DeleteAsync(id);
        await _repository.SaveChangesAsync();
        return NoContent();
    }
}
