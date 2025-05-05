using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Worker.Models;

public class Timesheet
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int AssignmentId { get; set; }

    [Required]
    public DateTime Date { get; set; }

    [Required]
    [Column(TypeName = "decimal(18,2)")]
    public decimal HoursWorked { get; set; }

    [Required]
    public bool Approved { get; set; }

    [ForeignKey("AssignmentId")]
    public virtual Assignment Assignment { get; set; }
}
