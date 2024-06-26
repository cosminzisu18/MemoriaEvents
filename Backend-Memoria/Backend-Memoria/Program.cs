using Backend_Memoria.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<FullStackDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("FullStackConnectionString")));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors(policy => policy.WithOrigins("http://localhost:4200", "https://memoriaevents.ro")
                              .AllowAnyHeader()
                              .AllowAnyMethod());



app.MapControllers();

app.Run();
