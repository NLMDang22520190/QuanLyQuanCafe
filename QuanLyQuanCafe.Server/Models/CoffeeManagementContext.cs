using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models.Domain;

namespace QuanLyQuanCafe.Server.Models;

public partial class CoffeeManagementContext : DbContext
{
    public CoffeeManagementContext()
    {
    }

    public CoffeeManagementContext(DbContextOptions<CoffeeManagementContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Attendance> Attendances { get; set; }

    public virtual DbSet<Cart> Carts { get; set; }

    public virtual DbSet<CartDetail> CartDetails { get; set; }

    public virtual DbSet<CustomerDetail> CustomerDetails { get; set; }

    public virtual DbSet<FoodType> FoodTypes { get; set; }

    public virtual DbSet<Importer> Importers { get; set; }

    public virtual DbSet<Ingredient> Ingredients { get; set; }

    public virtual DbSet<ItemRecipe> ItemRecipes { get; set; }

    public virtual DbSet<MenuItem> MenuItems { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderDetail> OrderDetails { get; set; }

    public virtual DbSet<Salary> Salaries { get; set; }

    public virtual DbSet<Schedule> Schedules { get; set; }

    public virtual DbSet<Shift> Shifts { get; set; }

    public virtual DbSet<Staff> Staffs { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<ImportRecord> ImportRecords { get; set; }

    public virtual DbSet<VoucherDetail> VoucherDetails { get; set; }
    public virtual DbSet<MonthSalary> MonthSalaries { get; set; }

    

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Attendance>(entity =>
        {
            entity.HasKey(e => e.AttendanceId).HasName("PK__Attendan__8B69263CA2B94504");

            entity.ToTable("Attendance");

            entity.Property(e => e.AttendanceId).HasColumnName("AttendanceID");
            entity.Property(e => e.ScheduleId).HasColumnName("ScheduleID");

            entity.HasOne(d => d.Schedule).WithMany(p => p.Attendances)
                .HasForeignKey(d => d.ScheduleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Attendanc__Sched__4D94879B");
        });

        modelBuilder.Entity<Cart>(entity =>
        {
            entity.HasKey(e => e.CartId).HasName("PK__Cart__51BCD79719E1986C");

            entity.ToTable("Cart");

            entity.Property(e => e.CartId).HasColumnName("CartID");
            entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
            entity.Property(e => e.LastUpdated).HasColumnType("datetime");

            entity.HasOne(d => d.Customer).WithMany(p => p.Carts)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Cart__CustomerID__6C190EBB");
        });

        modelBuilder.Entity<CartDetail>(entity =>
        {
            entity.HasKey(e => e.CartDetailId).HasName("PK__CartDeta__01B6A6D4DD924614");

            entity.Property(e => e.CartDetailId).HasColumnName("CartDetailID");
            entity.Property(e => e.CartId).HasColumnName("CartID");
            entity.Property(e => e.ItemId).HasColumnName("ItemID");
            entity.Property(e => e.Notes).HasMaxLength(255);

            //entity.HasOne(d => d.Cart).WithMany(p => p.CartDetails)
            //    .HasForeignKey(d => d.CartId)
            //    .OnDelete(DeleteBehavior.ClientSetNull)
            //    .HasConstraintName("FK__CartDetai__CartI__6EF57B66");

            entity.HasOne(d => d.Item).WithMany(p => p.CartDetails)
                .HasForeignKey(d => d.ItemId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CartDetai__ItemI__6FE99F9F");
        });

        modelBuilder.Entity<CustomerDetail>(entity =>
        {
            entity.HasKey(e => e.CustomerId).HasName("PK__Customer__A4AE64B89610DD0D");

            entity.HasIndex(e => e.UserId, "UQ__Customer__1788CCADA42D5552").IsUnique();

            entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
            entity.Property(e => e.AccountStatus)
                .HasMaxLength(20)
                .HasDefaultValue("Active");
            entity.Property(e => e.CustomerAddress).HasMaxLength(255);
            entity.Property(e => e.CustomerName).HasMaxLength(100);
            entity.Property(e => e.CustomerPhone).HasMaxLength(15);
            entity.Property(e => e.CustomerPoint).HasDefaultValue(0);
            entity.Property(e => e.CustomerStatus)
                .HasMaxLength(20)
                .HasDefaultValue("Normal");
            entity.Property(e => e.UserId).HasColumnName("UserID");
        });

        modelBuilder.Entity<FoodType>(entity =>
        {
            entity.HasKey(e => e.TypeOfFoodId).HasName("PK__FoodType__A86DA8FF9F87DB0B");

            entity.Property(e => e.TypeOfFoodId).HasColumnName("TypeOfFoodID");
            entity.Property(e => e.TypeOfFoodName).HasMaxLength(50);
        });

        modelBuilder.Entity<Importer>(entity =>
        {
            entity.HasKey(e => e.ImporterId).HasName("PK__Importer__F516551233E2184F");

            entity.Property(e => e.ImporterId).HasColumnName("ImporterID");
            entity.Property(e => e.ImporterName).HasMaxLength(100);
        });

        modelBuilder.Entity<Ingredient>(entity =>
        {
            entity.HasKey(e => e.IngredientId).HasName("PK__Ingredie__BEAEB27AD332FD81");

            entity.Property(e => e.IngredientId).HasColumnName("IngredientID");
            entity.Property(e => e.ImporterId).HasColumnName("ImporterID");
            entity.Property(e => e.IngredientName).HasMaxLength(100);
            entity.Property(e => e.Unit).HasMaxLength(20);
        });

        modelBuilder.Entity<ItemRecipe>(entity =>
        {
            entity.HasKey(e => new { e.ItemId, e.IngredientId }).HasName("PK__ItemReci__C99468CCABEC3E11");

            entity.ToTable("ItemRecipe");

            entity.Property(e => e.ItemId).HasColumnName("ItemID");
            entity.Property(e => e.IngredientId).HasColumnName("IngredientID");

            entity.HasOne(d => d.Ingredient).WithMany(p => p.ItemRecipes)
                .HasForeignKey(d => d.IngredientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ItemRecip__Ingre__5FB337D6");

            entity.HasOne(d => d.Item).WithMany(p => p.ItemRecipes)
                .HasForeignKey(d => d.ItemId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ItemRecip__ItemI__5EBF139D");
        });

        modelBuilder.Entity<MenuItem>(entity =>
        {
            entity.HasKey(e => e.ItemId).HasName("PK__MenuItem__727E83EB6978D1B4");

            entity.Property(e => e.ItemId).HasColumnName("ItemID");
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.ItemName).HasMaxLength(100);
            entity.Property(e => e.Picture).HasMaxLength(255);
            entity.Property(e => e.State)
                .HasMaxLength(20)
                .HasDefaultValue("Còn hàng");
            entity.Property(e => e.TypeOfFoodId).HasColumnName("TypeOfFoodID");

            entity.HasOne(d => d.TypeOfFood).WithMany(p => p.MenuItems)
                .HasForeignKey(d => d.TypeOfFoodId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MenuItems__TypeO__571DF1D5");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("PK__Orders__C3905BAFC52D5F48");

            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
            entity.Property(e => e.OrderState).HasMaxLength(20);
            entity.Property(e => e.OrderTime).HasColumnType("datetime");
            entity.Property(e => e.PaymentMethod).HasMaxLength(50);

            entity.HasOne(d => d.Customer).WithMany(p => p.Orders)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Orders__Customer__628FA481");
        });

        modelBuilder.Entity<OrderDetail>(entity =>
        {
            entity.HasKey(e => e.OrderDetailId).HasName("PK__OrderDet__D3B9D30C802D6A90");

            entity.Property(e => e.OrderDetailId).HasColumnName("OrderDetailID");
            entity.Property(e => e.ItemId).HasColumnName("ItemID");
            entity.Property(e => e.Notes).HasMaxLength(255);
            entity.Property(e => e.OrderId).HasColumnName("OrderID");

            entity.HasOne(d => d.Item).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.ItemId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__OrderDeta__ItemI__66603565");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__OrderDeta__Order__656C112C");
        });

        modelBuilder.Entity<Salary>(entity =>
        {
            entity.HasKey(e => e.SalaryId).HasName("PK__Salary__4BE204B7D4F18DFE");

            entity.ToTable("Salary");

            entity.Property(e => e.SalaryId).HasColumnName("SalaryID");
            entity.Property(e => e.StaffId).HasColumnName("StaffID");

            entity.HasOne(d => d.Staff).WithMany(p => p.Salaries)
                .HasForeignKey(d => d.StaffId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Salary__StaffID__5165187F");
        });

        modelBuilder.Entity<Schedule>(entity =>
        {
            entity.HasKey(e => e.ScheduleId).HasName("PK__Schedule__9C8A5B6915250820");

            entity.Property(e => e.ScheduleId).HasColumnName("ScheduleID");
            
            entity.Property(e => e.ShiftId).HasColumnName("ShiftID");
            entity.Property(e => e.StaffId).HasColumnName("StaffID");

            entity.HasOne(d => d.Shift).WithMany(p => p.Schedules)
                .HasForeignKey(d => d.ShiftId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Schedules__Shift__49C3F6B7");

            entity.HasOne(d => d.Staff).WithMany(p => p.Schedules)
                .HasForeignKey(d => d.StaffId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Schedules__Staff__48CFD27E");
        });

        modelBuilder.Entity<Shift>(entity =>
        {
            entity.HasKey(e => e.ShiftId).HasName("PK__Shifts__C0A838E1A0411B33");

            entity.Property(e => e.ShiftId).HasColumnName("ShiftID");
            entity.Property(e => e.ShiftName).HasMaxLength(50);
        });

        modelBuilder.Entity<Staff>(entity =>
        {
            entity.HasKey(e => e.StaffId).HasName("PK__Staffs__96D4AAF765015FDD");

            entity.Property(e => e.StaffId).HasColumnName("StaffID");
            entity.Property(e => e.Address).HasMaxLength(255);
            entity.Property(e => e.FullName).HasMaxLength(100);
            entity.Property(e => e.PhoneNumber).HasMaxLength(15);
            entity.Property(e => e.Role).HasMaxLength(50);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CCAC641C6767");

            entity.HasIndex(e => e.Username, "UQ__Users__536C85E4169A0A61").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
            entity.Property(e => e.Password).HasMaxLength(255);
            entity.Property(e => e.UserType).HasMaxLength(20);
            entity.Property(e => e.Username).HasMaxLength(50);

            entity.HasOne(d => d.Customer).WithMany(p => p.Users)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("FK__Users__CustomerI__4222D4EF");
        });

        modelBuilder.Entity<VoucherDetail>(entity =>
        {
            entity.HasKey(e => e.VoucherId).HasName("PK__VoucherD__3AEE79C169687464");

            entity.HasIndex(e => e.VoucherCode, "UQ__VoucherD__7F0ABCA998F92D0B").IsUnique();

            entity.Property(e => e.VoucherId).HasColumnName("VoucherID");
            entity.Property(e => e.VoucherCode).HasMaxLength(50);
            entity.Property(e => e.VoucherName).HasMaxLength(100);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    //internal async Task SaveChangesAsync()
    //{
    //    throw new NotImplementedException();
    //}

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
