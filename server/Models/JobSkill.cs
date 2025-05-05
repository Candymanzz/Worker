using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Worker.Models;

public class JobSkill
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int JobId { get; set; }

    [Required]
    [StringLength(100)]
    public string SkillName { get; set; }

    [ForeignKey("JobId")]
    public virtual Job Job { get; set; }
}
