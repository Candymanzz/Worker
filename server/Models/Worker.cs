using System.ComponentModel.DataAnnotations;

namespace Worker.Models;

public class Worker
{
    public Worker()
    {
        Applications = new List<Application>();
        Assignments = new List<Assignment>();
        ReviewsAsAuthor = new List<Review>();
    }

    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(50)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [StringLength(50)]
    public string LastName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [Phone]
    public string Phone { get; set; } = string.Empty;

    [Required]
    public DateTime BirthDate { get; set; }

    public string? Skills { get; set; }

    [Required]
    public string Availability { get; set; } = string.Empty;

    public virtual ICollection<Application> Applications { get; set; }
    public virtual ICollection<Assignment> Assignments { get; set; }
    public virtual ICollection<Review> ReviewsAsAuthor { get; set; }
}
