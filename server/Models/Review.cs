using System.ComponentModel.DataAnnotations;

namespace Worker.Models;

public class Review
{
    [Key]
    public int Id { get; set; }

    [Required]
    public ReviewAuthorType AuthorType { get; set; }

    [Required]
    public int AuthorId { get; set; }

    [Required]
    public int TargetId { get; set; }

    [Required]
    [Range(1, 5)]
    public int Rating { get; set; }

    public string Comment { get; set; }

    [Required]
    public DateTime CreatedAt { get; set; }
}
