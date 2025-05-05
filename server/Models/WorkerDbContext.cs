using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;

namespace Worker.Models
{
    public class WorkerDbContext : DbContext
    {
        public WorkerDbContext(DbContextOptions<WorkerDbContext> options)
            : base(options) { }

        public DbSet<Employer> Employers { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Worker> Workers { get; set; }
        public DbSet<Application> Applications { get; set; }
        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<Timesheet> Timesheets { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<JobCategory> JobCategories { get; set; }
        public DbSet<JobSkill> JobSkills { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Конфигурация Employer
            modelBuilder.Entity<Employer>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.CompanyName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.ContactPerson).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Email).IsRequired();
                entity.Property(e => e.Phone).IsRequired();
                entity.Property(e => e.Industry).HasMaxLength(100);
                entity.Property(e => e.Address).HasMaxLength(200);
            });

            // Конфигурация Job
            modelBuilder.Entity<Job>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Description).IsRequired();
                entity.Property(e => e.Location).IsRequired().HasMaxLength(200);
                entity.Property(e => e.SalaryPerHour).HasColumnType("decimal(18,2)");

                entity
                    .HasOne(e => e.Employer)
                    .WithMany(e => e.Jobs)
                    .HasForeignKey(e => e.EmployerId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Конфигурация Worker
            modelBuilder.Entity<Worker>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.FirstName).IsRequired().HasMaxLength(50);
                entity.Property(e => e.LastName).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Email).IsRequired();
                entity.Property(e => e.Phone).IsRequired();
                entity.Property(e => e.Availability).IsRequired();
            });

            // Конфигурация Application
            modelBuilder.Entity<Application>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity
                    .HasOne(e => e.Job)
                    .WithMany(e => e.Applications)
                    .HasForeignKey(e => e.JobId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity
                    .HasOne(e => e.Worker)
                    .WithMany(e => e.Applications)
                    .HasForeignKey(e => e.WorkerId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Конфигурация Assignment
            modelBuilder.Entity<Assignment>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity
                    .HasOne(e => e.Job)
                    .WithMany(e => e.Assignments)
                    .HasForeignKey(e => e.JobId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity
                    .HasOne(e => e.Worker)
                    .WithMany(e => e.Assignments)
                    .HasForeignKey(e => e.WorkerId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Конфигурация Timesheet
            modelBuilder.Entity<Timesheet>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.HoursWorked).HasColumnType("decimal(18,2)");

                entity
                    .HasOne(e => e.Assignment)
                    .WithMany(e => e.Timesheets)
                    .HasForeignKey(e => e.AssignmentId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Конфигурация Payment
            modelBuilder.Entity<Payment>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Amount).HasColumnType("decimal(18,2)");

                entity
                    .HasOne(e => e.Assignment)
                    .WithMany(e => e.Payments)
                    .HasForeignKey(e => e.AssignmentId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Конфигурация Review
            modelBuilder.Entity<Review>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Rating).IsRequired();
                entity.Property(e => e.CreatedAt).IsRequired();
            });

            // Конфигурация JobCategory
            modelBuilder.Entity<JobCategory>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            });

            // Конфигурация JobSkill
            modelBuilder.Entity<JobSkill>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.SkillName).IsRequired().HasMaxLength(100);

                entity
                    .HasOne(e => e.Job)
                    .WithMany(e => e.RequiredSkills)
                    .HasForeignKey(e => e.JobId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
