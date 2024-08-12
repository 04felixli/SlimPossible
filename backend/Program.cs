using ftDB.Interfaces;
using ftDB.Dao;
using ftDB.Repo;
using ftDB.AppSettings;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;
ModelAppSettings.Instance.DBConnectionString = configuration.GetConnectionString("FitnessTrackerDatabase");

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(option =>
            {
                option.AddDefaultPolicy(
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    }
                );
            });

builder.Services.AddScoped<IRepo, MainRepo>();
builder.Services.AddScoped<IDao, MainDao>();
builder.Services.AddScoped<PostgressDBContext>();

builder.Services.AddDbContext<PostgressDBContext>(options => options.UseNpgsql(ModelAppSettings.Instance.DBConnectionString)
                // The following three options help with debugging, but should
                // be changed or removed for production.
                .LogTo(Console.WriteLine, LogLevel.Information)
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors());


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors();

app.UseAuthorization();

app.MapControllers();
app.Run();