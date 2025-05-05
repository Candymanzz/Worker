using System;
using System.Collections.Generic;

namespace Worker.Models
{
    public static class SeedData
    {
        public static void Initialize(WorkerDbContext context)
        {
            // Добавляем работодателей
            var employers = new List<Employer>
            {
                new Employer
                {
                    CompanyName = "ООО Технологии Будущего",
                    ContactPerson = "Иван Петров",
                    Email = "ivan@techfuture.ru",
                    Phone = "+7 (999) 123-45-67",
                    Industry = "IT",
                    Address = "г. Москва, ул. Ленина, 10",
                },
                new Employer
                {
                    CompanyName = "ИП Смирнов",
                    ContactPerson = "Алексей Смирнов",
                    Email = "alex@smirnov.ru",
                    Phone = "+7 (999) 234-56-78",
                    Industry = "Строительство",
                    Address = "г. Санкт-Петербург, ул. Пушкина, 5",
                },
                new Employer
                {
                    CompanyName = "ООО Розничная Сеть",
                    ContactPerson = "Мария Иванова",
                    Email = "maria@retail.ru",
                    Phone = "+7 (999) 345-67-89",
                    Industry = "Розничная торговля",
                    Address = "г. Екатеринбург, ул. Гагарина, 15",
                },
                new Employer
                {
                    CompanyName = "ООО Логистика Плюс",
                    ContactPerson = "Дмитрий Сидоров",
                    Email = "dmitry@logistics.ru",
                    Phone = "+7 (999) 456-78-90",
                    Industry = "Логистика",
                    Address = "г. Новосибирск, ул. Мира, 20",
                },
            };
            context.Employers.AddRange(employers);
            context.SaveChanges();

            // Добавляем категории работ
            var jobCategories = new List<JobCategory>
            {
                new JobCategory { Name = "Курьер" },
                new JobCategory { Name = "Продавец" },
                new JobCategory { Name = "Промоутер" },
                new JobCategory { Name = "Разнорабочий" },
            };
            context.JobCategories.AddRange(jobCategories);
            context.SaveChanges();

            // Добавляем работников
            var workers = new List<Worker>
            {
                new Worker
                {
                    FirstName = "Александр",
                    LastName = "Козлов",
                    Email = "alex@mail.ru",
                    Phone = "+7 (999) 567-89-01",
                    BirthDate = new DateTime(1990, 5, 15, 0, 0, 0, DateTimeKind.Utc),
                    Skills = "Водительские права категории B, знание города",
                    Availability = "Будние дни",
                },
                new Worker
                {
                    FirstName = "Елена",
                    LastName = "Морозова",
                    Email = "elena@mail.ru",
                    Phone = "+7 (999) 678-90-12",
                    BirthDate = new DateTime(1995, 8, 20, 0, 0, 0, DateTimeKind.Utc),
                    Skills = "Опыт работы в рознице, коммуникабельность",
                    Availability = "Выходные дни",
                },
                new Worker
                {
                    FirstName = "Михаил",
                    LastName = "Соколов",
                    Email = "mikhail@mail.ru",
                    Phone = "+7 (999) 789-01-23",
                    BirthDate = new DateTime(1992, 3, 10, 0, 0, 0, DateTimeKind.Utc),
                    Skills = "Физическая выносливость, опыт работы на складе",
                    Availability = "Любые дни",
                },
                new Worker
                {
                    FirstName = "Ольга",
                    LastName = "Волкова",
                    Email = "olga@mail.ru",
                    Phone = "+7 (999) 890-12-34",
                    BirthDate = new DateTime(1993, 11, 25, 0, 0, 0, DateTimeKind.Utc),
                    Skills = "Опыт работы промоутером, активность",
                    Availability = "Будние дни",
                },
            };
            context.Workers.AddRange(workers);
            context.SaveChanges();

            // Добавляем вакансии
            var jobs = new List<Job>
            {
                new Job
                {
                    EmployerId = employers[0].Id,
                    Title = "Курьер по доставке",
                    Description = "Доставка товаров по городу",
                    Location = "г. Москва",
                    StartDate = DateTime.UtcNow,
                    EndDate = DateTime.UtcNow.AddMonths(3),
                    SalaryPerHour = 500,
                    Status = JobStatus.Open,
                },
                new Job
                {
                    EmployerId = employers[1].Id,
                    Title = "Продавец-консультант",
                    Description = "Работа в строительном магазине",
                    Location = "г. Санкт-Петербург",
                    StartDate = DateTime.UtcNow,
                    EndDate = DateTime.UtcNow.AddMonths(2),
                    SalaryPerHour = 400,
                    Status = JobStatus.Open,
                },
                new Job
                {
                    EmployerId = employers[2].Id,
                    Title = "Промоутер",
                    Description = "Проведение акций в торговом центре",
                    Location = "г. Екатеринбург",
                    StartDate = DateTime.UtcNow,
                    EndDate = DateTime.UtcNow.AddMonths(1),
                    SalaryPerHour = 350,
                    Status = JobStatus.Open,
                },
                new Job
                {
                    EmployerId = employers[3].Id,
                    Title = "Грузчик",
                    Description = "Погрузочно-разгрузочные работы",
                    Location = "г. Новосибирск",
                    StartDate = DateTime.UtcNow,
                    EndDate = DateTime.UtcNow.AddMonths(2),
                    SalaryPerHour = 450,
                    Status = JobStatus.Open,
                },
            };
            context.Jobs.AddRange(jobs);
            context.SaveChanges();

            // Добавляем отклики
            var applications = new List<Application>
            {
                new Application
                {
                    JobId = jobs[0].Id,
                    WorkerId = workers[0].Id,
                    Status = ApplicationStatus.Pending,
                    AppliedAt = DateTime.UtcNow,
                },
                new Application
                {
                    JobId = jobs[1].Id,
                    WorkerId = workers[1].Id,
                    Status = ApplicationStatus.Accepted,
                    AppliedAt = DateTime.UtcNow,
                },
                new Application
                {
                    JobId = jobs[2].Id,
                    WorkerId = workers[2].Id,
                    Status = ApplicationStatus.Pending,
                    AppliedAt = DateTime.UtcNow,
                },
                new Application
                {
                    JobId = jobs[3].Id,
                    WorkerId = workers[3].Id,
                    Status = ApplicationStatus.Accepted,
                    AppliedAt = DateTime.UtcNow,
                },
            };
            context.Applications.AddRange(applications);
            context.SaveChanges();

            // Добавляем назначения
            var assignments = new List<Assignment>
            {
                new Assignment
                {
                    JobId = jobs[0].Id,
                    WorkerId = workers[0].Id,
                    AssignedAt = DateTime.UtcNow,
                    Status = AssignmentStatus.Active,
                },
                new Assignment
                {
                    JobId = jobs[1].Id,
                    WorkerId = workers[1].Id,
                    AssignedAt = DateTime.UtcNow,
                    Status = AssignmentStatus.Active,
                },
                new Assignment
                {
                    JobId = jobs[2].Id,
                    WorkerId = workers[2].Id,
                    AssignedAt = DateTime.UtcNow,
                    Status = AssignmentStatus.Active,
                },
                new Assignment
                {
                    JobId = jobs[3].Id,
                    WorkerId = workers[3].Id,
                    AssignedAt = DateTime.UtcNow,
                    Status = AssignmentStatus.Active,
                },
            };
            context.Assignments.AddRange(assignments);
            context.SaveChanges();

            // Добавляем табели
            var timesheets = new List<Timesheet>
            {
                new Timesheet
                {
                    AssignmentId = assignments[0].Id,
                    Date = DateTime.UtcNow,
                    HoursWorked = 8,
                    Approved = true,
                },
                new Timesheet
                {
                    AssignmentId = assignments[1].Id,
                    Date = DateTime.UtcNow,
                    HoursWorked = 6,
                    Approved = true,
                },
                new Timesheet
                {
                    AssignmentId = assignments[2].Id,
                    Date = DateTime.UtcNow,
                    HoursWorked = 4,
                    Approved = false,
                },
                new Timesheet
                {
                    AssignmentId = assignments[3].Id,
                    Date = DateTime.UtcNow,
                    HoursWorked = 8,
                    Approved = true,
                },
            };
            context.Timesheets.AddRange(timesheets);
            context.SaveChanges();

            // Добавляем платежи
            var payments = new List<Payment>
            {
                new Payment
                {
                    AssignmentId = assignments[0].Id,
                    Amount = 4000,
                    PaymentDate = DateTime.UtcNow,
                    PaymentMethod = PaymentMethod.Bank,
                },
                new Payment
                {
                    AssignmentId = assignments[1].Id,
                    Amount = 2400,
                    PaymentDate = DateTime.UtcNow,
                    PaymentMethod = PaymentMethod.Card,
                },
                new Payment
                {
                    AssignmentId = assignments[2].Id,
                    Amount = 1400,
                    PaymentDate = DateTime.UtcNow,
                    PaymentMethod = PaymentMethod.Cash,
                },
                new Payment
                {
                    AssignmentId = assignments[3].Id,
                    Amount = 3600,
                    PaymentDate = DateTime.UtcNow,
                    PaymentMethod = PaymentMethod.Bank,
                },
            };
            context.Payments.AddRange(payments);
            context.SaveChanges();

            // Добавляем отзывы
            var reviews = new List<Review>
            {
                new Review
                {
                    AuthorType = ReviewAuthorType.Employer,
                    AuthorId = employers[0].Id,
                    TargetId = workers[0].Id,
                    Rating = 5,
                    Comment = "Отличный работник, всегда пунктуален",
                    CreatedAt = DateTime.UtcNow,
                },
                new Review
                {
                    AuthorType = ReviewAuthorType.Worker,
                    AuthorId = workers[1].Id,
                    TargetId = employers[1].Id,
                    Rating = 4,
                    Comment = "Хорошие условия работы",
                    CreatedAt = DateTime.UtcNow,
                },
                new Review
                {
                    AuthorType = ReviewAuthorType.Employer,
                    AuthorId = employers[2].Id,
                    TargetId = workers[2].Id,
                    Rating = 5,
                    Comment = "Очень активный и коммуникабельный",
                    CreatedAt = DateTime.UtcNow,
                },
                new Review
                {
                    AuthorType = ReviewAuthorType.Worker,
                    AuthorId = workers[3].Id,
                    TargetId = employers[3].Id,
                    Rating = 4,
                    Comment = "Удобный график работы",
                    CreatedAt = DateTime.UtcNow,
                },
            };
            context.Reviews.AddRange(reviews);
            context.SaveChanges();

            // Добавляем навыки для вакансий
            var jobSkills = new List<JobSkill>
            {
                new JobSkill { JobId = jobs[0].Id, SkillName = "Водительские права" },
                new JobSkill { JobId = jobs[1].Id, SkillName = "Опыт работы в рознице" },
                new JobSkill { JobId = jobs[2].Id, SkillName = "Коммуникабельность" },
                new JobSkill { JobId = jobs[3].Id, SkillName = "Физическая выносливость" },
            };
            context.JobSkills.AddRange(jobSkills);
            context.SaveChanges();
        }
    }
}
