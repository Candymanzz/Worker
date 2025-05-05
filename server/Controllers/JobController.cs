using Microsoft.AspNetCore.Mvc;
using Worker.Models;
using Worker.Repositories;

namespace Worker.Controllers;

[ApiController]
[Route("api/[controller]")]
public class JobController : ControllerBase
{
    private readonly JobRepository _repository;

    public JobController(JobRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Models.Job>>> GetAll()
    {
        var jobs = await _repository.GetAllAsync();
        return Ok(jobs);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Models.Job>> GetById(int id)
    {
        var job = await _repository.GetByIdAsync(id);
        if (job == null)
        {
            return NotFound();
        }
        return Ok(job);
    }

    [HttpGet("status/{status}")]
    public async Task<ActionResult<IEnumerable<Models.Job>>> GetByStatus(JobStatus status)
    {
        var jobs = await _repository.GetJobsByStatusAsync(status);
        return Ok(jobs);
    }

    [HttpGet("location/{location}")]
    public async Task<ActionResult<IEnumerable<Models.Job>>> GetByLocation(string location)
    {
        var jobs = await _repository.GetJobsByLocationAsync(location);
        return Ok(jobs);
    }

    [HttpPost]
    public async Task<ActionResult<Models.Job>> Create(Models.Job job)
    {
        await _repository.AddAsync(job);
        await _repository.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = job.Id }, job);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Models.Job job)
    {
        if (id != job.Id)
        {
            return BadRequest();
        }

        var existingJob = await _repository.GetByIdAsync(id);
        if (existingJob == null)
        {
            return NotFound();
        }

        await _repository.UpdateAsync(job);
        await _repository.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var job = await _repository.GetByIdAsync(id);
        if (job == null)
        {
            return NotFound();
        }

        await _repository.DeleteAsync(id);
        await _repository.SaveChangesAsync();
        return NoContent();
    }
}
