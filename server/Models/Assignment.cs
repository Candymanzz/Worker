using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Worker.Models;

public class Assignment
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int JobId { get; set; }

    [Required]
    public int WorkerId { get; set; }

    [Required]
    public DateTime AssignedAt { get; set; }

    [Required]
    public AssignmentStatus Status { get; set; }

    [ForeignKey("JobId")]
    public virtual Job Job { get; set; }

    [ForeignKey("WorkerId")]
    public virtual Worker Worker { get; set; }

    public virtual ICollection<Timesheet> Timesheets { get; set; }
    public virtual ICollection<Payment> Payments { get; set; }
}
