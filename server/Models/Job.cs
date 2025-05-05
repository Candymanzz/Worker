using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Worker.Models;

public class Job
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int EmployerId { get; set; }

    [Required]
    [StringLength(100)]
    public string Title { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    [StringLength(200)]
    public string Location { get; set; }

    [Required]
    public DateTime StartDate { get; set; }

    [Required]
    public DateTime EndDate { get; set; }

    [Required]
    [Column(TypeName = "decimal(18,2)")]
    public decimal SalaryPerHour { get; set; }

    [Required]
    public JobStatus Status { get; set; }

    [ForeignKey("EmployerId")]
    public virtual Employer Employer { get; set; }

    public virtual ICollection<Application> Applications { get; set; }
    public virtual ICollection<Assignment> Assignments { get; set; }
    public virtual ICollection<JobSkill> RequiredSkills { get; set; }
}
