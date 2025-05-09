using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using Worker.Models;
using Worker.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder
    .Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
        options.JsonSerializerOptions.MaxDepth = 32;
    });

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder
            .WithOrigins("http://localhost:3000") // URL вашего фронтенда
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials()
            .SetIsOriginAllowed(origin => true); // Разрешаем все источники в режиме разработки
    });
});

// Add Swagger services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Worker API", Version = "v1" });
});

// Configure PostgreSQL connection
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<WorkerDbContext>(options => options.UseNpgsql(connectionString));

// Register repositories
builder.Services.AddScoped<WorkerRepository>();
builder.Services.AddScoped<EmployerRepository>();
builder.Services.AddScoped<JobRepository>();
builder.Services.AddScoped<ApplicationRepository>();
builder.Services.AddScoped<AssignmentRepository>();
builder.Services.AddScoped<TimesheetRepository>();
builder.Services.AddScoped<PaymentRepository>();
builder.Services.AddScoped<ReviewRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Worker API V1");
    });
}

// Use CORS before other middleware
app.UseCors();

// Initialize seed data
if (builder.Configuration["SeedData"] == "true")
{
    using (var scope = app.Services.CreateScope())
    {
        var services = scope.ServiceProvider;
        try
        {
            var context = services.GetRequiredService<WorkerDbContext>();
            SeedData.Initialize(context);
        }
        catch (Exception ex)
        {
            var logger = services.GetRequiredService<ILogger<Program>>();
            logger.LogError(ex, "An error occurred while seeding the database.");
        }
    }
}

// Remove HTTPS redirection
// app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
