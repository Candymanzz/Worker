using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Worker.Models;

public class Payment
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int AssignmentId { get; set; }

    [Required]
    [Column(TypeName = "decimal(18,2)")]
    public decimal Amount { get; set; }

    [Required]
    public DateTime PaymentDate { get; set; }

    [Required]
    public PaymentStatus Status { get; set; }

    [Required]
    public PaymentMethod PaymentMethod { get; set; }

    [ForeignKey("AssignmentId")]
    public virtual Assignment Assignment { get; set; }
}
