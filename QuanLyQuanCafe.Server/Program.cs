﻿using Microsoft.EntityFrameworkCore;
using System;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;
using QuanLyQuanCafe.Server.Repositories.Implement;

var builder = WebApplication.CreateBuilder(args);


//CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder => builder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());
});

// Đọc ConnectionString từ appsettings.json
Console.WriteLine("connection string: " + builder.Configuration.GetConnectionString("se100-db"));
builder.Services.AddDbContext<CoffeeManagementContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("se100-db")));
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IShiftRepository, SQLShiftRepository>();
builder.Services.AddScoped<ISalaryRepository, SQLSalaryRepository>();
builder.Services.AddScoped<IScheduleRepository, SQLScheduleRepository>();
builder.Services.AddScoped<IStaffRepository, SQLStaffRepository>();
builder.Services.AddScoped<IMonthSalaryRepository, SQLMonthSalaryRepository>();
builder.Services.AddScoped<IAttendanceRepository, SQLAttendanceRepository>();
builder.Services.AddScoped<IFoodTypeRepository, SQLFoodTypeRepository>();
builder.Services.AddScoped<IMenuItemRepository, SQLMenuItemRepository>();
builder.Services.AddScoped<IVoucherDetailRepository, SQLVoucherDetailRepository>();
builder.Services.AddScoped<IOrderDetailRepository, SQLOrderDetailRepository>();
builder.Services.AddScoped<IOrderRepository, SQLOrderRepository>();
builder.Services.AddScoped<IIngredientRepository, SQLIngredientRepository>();

var app = builder.Build();

// Use CORS
app.UseCors("AllowAllOrigins");

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.Urls.Add("https://localhost:7087");
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
