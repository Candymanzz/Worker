using Microsoft.AspNetCore.Mvc;
using Worker.Models;
using Worker.Repositories;

namespace Worker.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployerController : ControllerBase
{
    private readonly EmployerRepository _repository;

    public EmployerController(EmployerRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Models.Employer>>> GetAll()
    {
        var employers = await _repository.GetAllAsync();
        return Ok(employers);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Models.Employer>> GetById(int id)
    {
        var employer = await _repository.GetByIdAsync(id);
        if (employer == null)
        {
            return NotFound();
        }
        return Ok(employer);
    }

    [HttpGet("industry/{industry}")]
    public async Task<ActionResult<IEnumerable<Models.Employer>>> GetByIndustry(string industry)
    {
        var employers = await _repository.GetEmployersByIndustryAsync(industry);
        return Ok(employers);
    }

    [HttpPost]
    public async Task<ActionResult<Models.Employer>> Create(Models.Employer employer)
    {
        await _repository.AddAsync(employer);
        await _repository.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = employer.Id }, employer);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Models.Employer employer)
    {
        if (id != employer.Id)
        {
            return BadRequest();
        }

        var existingEmployer = await _repository.GetByIdAsync(id);
        if (existingEmployer == null)
        {
            return NotFound();
        }

        await _repository.UpdateAsync(employer);
        await _repository.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var employer = await _repository.GetByIdAsync(id);
        if (employer == null)
        {
            return NotFound();
        }

        await _repository.DeleteAsync(id);
        await _repository.SaveChangesAsync();
        return NoContent();
    }
}
