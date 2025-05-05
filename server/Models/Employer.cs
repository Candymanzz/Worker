using System.ComponentModel.DataAnnotations;

namespace Worker.Models;

public class Employer
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string CompanyName { get; set; }

    [Required]
    [StringLength(100)]
    public string ContactPerson { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [Phone]
    public string Phone { get; set; }

    [StringLength(100)]
    public string Industry { get; set; }

    [StringLength(200)]
    public string Address { get; set; }

    public virtual ICollection<Job> Jobs { get; set; }
    public virtual ICollection<Review> ReviewsAsAuthor { get; set; }
}
