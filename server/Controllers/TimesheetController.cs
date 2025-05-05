using Microsoft.AspNetCore.Mvc;
using Worker.Models;
using Worker.Repositories;

namespace Worker.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TimesheetController : ControllerBase
{
    private readonly TimesheetRepository _repository;

    public TimesheetController(TimesheetRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Models.Timesheet>>> GetAll()
    {
        var timesheets = await _repository.GetAllAsync();
        return Ok(timesheets);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Models.Timesheet>> GetById(int id)
    {
        var timesheet = await _repository.GetByIdAsync(id);
        if (timesheet == null)
        {
            return NotFound();
        }
        return Ok(timesheet);
    }

    [HttpGet("assignment/{assignmentId}")]
    public async Task<ActionResult<IEnumerable<Models.Timesheet>>> GetByAssignmentId(
        int assignmentId
    )
    {
        var timesheets = await _repository.GetTimesheetsByAssignmentIdAsync(assignmentId);
        return Ok(timesheets);
    }

    [HttpGet("date/{date}")]
    public async Task<ActionResult<IEnumerable<Models.Timesheet>>> GetByDate(DateTime date)
    {
        var timesheets = await _repository.GetTimesheetsByDateAsync(date);
        return Ok(timesheets);
    }

    [HttpGet("approved/{approved}")]
    public async Task<ActionResult<IEnumerable<Models.Timesheet>>> GetByApprovalStatus(
        bool approved
    )
    {
        var timesheets = await _repository.GetTimesheetsByApprovalStatusAsync(approved);
        return Ok(timesheets);
    }

    [HttpPost]
    public async Task<ActionResult<Models.Timesheet>> Create(Models.Timesheet timesheet)
    {
        await _repository.AddAsync(timesheet);
        await _repository.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = timesheet.Id }, timesheet);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Models.Timesheet timesheet)
    {
        if (id != timesheet.Id)
        {
            return BadRequest();
        }

        var existingTimesheet = await _repository.GetByIdAsync(id);
        if (existingTimesheet == null)
        {
            return NotFound();
        }

        await _repository.UpdateAsync(timesheet);
        await _repository.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var timesheet = await _repository.GetByIdAsync(id);
        if (timesheet == null)
        {
            return NotFound();
        }

        await _repository.DeleteAsync(id);
        await _repository.SaveChangesAsync();
        return NoContent();
    }
}
