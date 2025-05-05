using Microsoft.AspNetCore.Mvc;
using Worker.Models;
using Worker.Repositories;

namespace Worker.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ApplicationController : ControllerBase
{
    private readonly ApplicationRepository _repository;

    public ApplicationController(ApplicationRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Models.Application>>> GetAll()
    {
        var applications = await _repository.GetAllAsync();
        return Ok(applications);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Models.Application>> GetById(int id)
    {
        var application = await _repository.GetByIdAsync(id);
        if (application == null)
        {
            return NotFound();
        }
        return Ok(application);
    }

    [HttpGet("status/{status}")]
    public async Task<ActionResult<IEnumerable<Models.Application>>> GetByStatus(
        ApplicationStatus status
    )
    {
        var applications = await _repository.GetApplicationsByStatusAsync(status);
        return Ok(applications);
    }

    [HttpGet("job/{jobId}")]
    public async Task<ActionResult<IEnumerable<Models.Application>>> GetByJobId(int jobId)
    {
        var applications = await _repository.GetApplicationsByJobIdAsync(jobId);
        return Ok(applications);
    }

    [HttpGet("worker/{workerId}")]
    public async Task<ActionResult<IEnumerable<Models.Application>>> GetByWorkerId(int workerId)
    {
        var applications = await _repository.GetApplicationsByWorkerIdAsync(workerId);
        return Ok(applications);
    }

    [HttpPost]
    public async Task<ActionResult<Models.Application>> Create(Models.Application application)
    {
        await _repository.AddAsync(application);
        await _repository.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = application.Id }, application);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Models.Application application)
    {
        if (id != application.Id)
        {
            return BadRequest();
        }

        var existingApplication = await _repository.GetByIdAsync(id);
        if (existingApplication == null)
        {
            return NotFound();
        }

        await _repository.UpdateAsync(application);
        await _repository.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var application = await _repository.GetByIdAsync(id);
        if (application == null)
        {
            return NotFound();
        }

        await _repository.DeleteAsync(id);
        await _repository.SaveChangesAsync();
        return NoContent();
    }
}
