using System.ComponentModel.DataAnnotations;

namespace Worker.Models;

public class JobCategory
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Name { get; set; }
}
