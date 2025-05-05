using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Worker.Models;

public class Application
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int JobId { get; set; }

    [Required]
    public int WorkerId { get; set; }

    [Required]
    public ApplicationStatus Status { get; set; }

    [Required]
    public DateTime AppliedAt { get; set; }

    [ForeignKey("JobId")]
    public virtual Job Job { get; set; }

    [ForeignKey("WorkerId")]
    public virtual Worker Worker { get; set; }
}
