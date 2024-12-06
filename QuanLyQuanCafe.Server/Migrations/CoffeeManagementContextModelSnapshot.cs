﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using QuanLyQuanCafe.Server.Models;

#nullable disable

namespace QuanLyQuanCafe.Server.Migrations
{
    [DbContext(typeof(CoffeeManagementContext))]
    partial class CoffeeManagementContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.Attendance", b =>
                {
                    b.Property<int>("AttendanceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("AttendanceID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AttendanceId"));

                    b.Property<DateTime>("Checkin")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("Checkout")
                        .HasColumnType("datetime2");

                    b.Property<DateOnly>("Date")
                        .HasColumnType("date");

                    b.Property<int>("ScheduleId")
                        .HasColumnType("int")
                        .HasColumnName("ScheduleID");

                    b.HasKey("AttendanceId")
                        .HasName("PK__Attendan__8B69263CA2B94504");

                    b.HasIndex("ScheduleId");

                    b.ToTable("Attendance", (string)null);
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.Cart", b =>
                {
                    b.Property<int>("CartId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("CartID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CartId"));

                    b.Property<int>("CustomerId")
                        .HasColumnType("int")
                        .HasColumnName("CustomerID");

                    b.Property<DateTime>("LastUpdated")
                        .HasColumnType("datetime");

                    b.HasKey("CartId")
                        .HasName("PK__Cart__51BCD79719E1986C");

                    b.HasIndex("CustomerId");

                    b.ToTable("Cart", (string)null);
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.CartDetail", b =>
                {
                    b.Property<int>("CartDetailId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("CartDetailID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CartDetailId"));

                    b.Property<string>("Adjustments")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CartId")
                        .HasColumnType("int")
                        .HasColumnName("CartID");

                    b.Property<int>("ItemId")
                        .HasColumnType("int")
                        .HasColumnName("ItemID");

                    b.Property<string>("Notes")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("CartDetailId")
                        .HasName("PK__CartDeta__01B6A6D4DD924614");

                    b.HasIndex("CartId");

                    b.HasIndex("ItemId");

                    b.ToTable("CartDetails");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.CustomerDetail", b =>
                {
                    b.Property<int>("CustomerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("CustomerID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CustomerId"));

                    b.Property<string>("AccountStatus")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasDefaultValue("Active");

                    b.Property<string>("CustomerAddress")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<DateOnly?>("CustomerBirthday")
                        .HasColumnType("date");

                    b.Property<string>("CustomerName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("CustomerPhone")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("nvarchar(15)");

                    b.Property<int?>("CustomerPoint")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasDefaultValue(0);

                    b.Property<string>("CustomerStatus")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasDefaultValue("Normal");

                    b.Property<int>("UserId")
                        .HasColumnType("int")
                        .HasColumnName("UserID");

                    b.HasKey("CustomerId")
                        .HasName("PK__Customer__A4AE64B89610DD0D");

                    b.HasIndex(new[] { "UserId" }, "UQ__Customer__1788CCADA42D5552")
                        .IsUnique();

                    b.ToTable("CustomerDetails");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.Domain.MonthSalary", b =>
                {
                    b.Property<int>("MSalaryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MSalaryId"));

                    b.Property<string>("Month")
                        .IsRequired()
                        .HasMaxLength(7)
                        .HasColumnType("nvarchar(7)");

                    b.Property<int>("SalaryId")
                        .HasColumnType("int");

                    b.Property<int>("TotalHours")
                        .HasColumnType("int");

                    b.HasKey("MSalaryId");

                    b.HasIndex("SalaryId");

                    b.ToTable("MonthSalary");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.FoodType", b =>
                {
                    b.Property<int>("TypeOfFoodId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("TypeOfFoodID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TypeOfFoodId"));

                    b.Property<string>("TypeOfFoodName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("TypeOfFoodId")
                        .HasName("PK__FoodType__A86DA8FF9F87DB0B");

                    b.ToTable("FoodTypes");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.Importer", b =>
                {
                    b.Property<int>("ImporterId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ImporterID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ImporterId"));

                    b.Property<string>("ImporterName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("ImporterId")
                        .HasName("PK__Importer__F516551233E2184F");

                    b.ToTable("Importers");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.Ingredient", b =>
                {
                    b.Property<int>("IngredientId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("IngredientID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IngredientId"));

                    b.Property<DateOnly>("DateImported")
                        .HasColumnType("date");

                    b.Property<DateOnly>("ExpiryDate")
                        .HasColumnType("date");

                    b.Property<double>("ImportPrice")
                        .HasColumnType("float");

                    b.Property<int>("ImporterId")
                        .HasColumnType("int")
                        .HasColumnName("ImporterID");

                    b.Property<string>("IngredientName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<double>("QuantityInStock")
                        .HasColumnType("float");

                    b.Property<string>("Unit")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("IngredientId")
                        .HasName("PK__Ingredie__BEAEB27AD332FD81");

                    b.ToTable("Ingredients");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.ItemRecipe", b =>
                {
                    b.Property<int>("ItemId")
                        .HasColumnType("int")
                        .HasColumnName("ItemID");

                    b.Property<int>("IngredientId")
                        .HasColumnType("int")
                        .HasColumnName("IngredientID");

                    b.Property<double>("Quantity")
                        .HasColumnType("float");

                    b.HasKey("ItemId", "IngredientId")
                        .HasName("PK__ItemReci__C99468CCABEC3E11");

                    b.HasIndex("IngredientId");

                    b.ToTable("ItemRecipe", (string)null);
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.MenuItem", b =>
                {
                    b.Property<int>("ItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ItemID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ItemId"));

                    b.Property<string>("Description")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("ItemName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Picture")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<string>("State")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasDefaultValue("Còn hàng");

                    b.Property<int>("TypeOfFoodId")
                        .HasColumnType("int")
                        .HasColumnName("TypeOfFoodID");

                    b.HasKey("ItemId")
                        .HasName("PK__MenuItem__727E83EB6978D1B4");

                    b.HasIndex("TypeOfFoodId");

                    b.ToTable("MenuItems");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.Order", b =>
                {
                    b.Property<int>("OrderId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("OrderID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("OrderId"));

                    b.Property<int>("CustomerId")
                        .HasColumnType("int")
                        .HasColumnName("CustomerID");

                    b.Property<string>("OrderState")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<DateTime>("OrderTime")
                        .HasColumnType("datetime");

                    b.Property<string>("PaymentMethod")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<double>("TotalPrice")
                        .HasColumnType("float");

                    b.Property<int?>("VoucherApplied")
                        .HasColumnType("int");

                    b.HasKey("OrderId")
                        .HasName("PK__Orders__C3905BAFC52D5F48");

                    b.HasIndex("CustomerId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.OrderDetail", b =>
                {
                    b.Property<int>("OrderDetailId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("OrderDetailID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("OrderDetailId"));

                    b.Property<string>("Adjustments")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ItemId")
                        .HasColumnType("int")
                        .HasColumnName("ItemID");

                    b.Property<string>("Notes")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<int>("OrderId")
                        .HasColumnType("int")
                        .HasColumnName("OrderID");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("OrderDetailId")
                        .HasName("PK__OrderDet__D3B9D30C802D6A90");

                    b.HasIndex("ItemId");

                    b.HasIndex("OrderId");

                    b.ToTable("OrderDetails");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.Salary", b =>
                {
                    b.Property<int>("SalaryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("SalaryID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("SalaryId"));

                    b.Property<int>("HourWage")
                        .HasColumnType("int");

                    b.Property<int>("StaffId")
                        .HasColumnType("int")
                        .HasColumnName("StaffID");

                    b.Property<DateOnly>("StartDate")
                        .HasColumnType("date");

                    b.HasKey("SalaryId")
                        .HasName("PK__Salary__4BE204B7D4F18DFE");

                    b.HasIndex("StaffId");

                    b.ToTable("Salary", (string)null);
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.Schedule", b =>
                {
                    b.Property<int>("ScheduleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ScheduleID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ScheduleId"));

                    b.Property<DateOnly>("EndDate")
                        .HasColumnType("date");

                    b.Property<int>("ShiftId")
                        .HasColumnType("int")
                        .HasColumnName("ShiftID");

                    b.Property<int>("StaffId")
                        .HasColumnType("int")
                        .HasColumnName("StaffID");

                    b.Property<DateOnly>("StartDate")
                        .HasColumnType("date");

                    b.HasKey("ScheduleId")
                        .HasName("PK__Schedule__9C8A5B6915250820");

                    b.HasIndex("ShiftId");

                    b.HasIndex("StaffId");

                    b.ToTable("Schedule");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.Shift", b =>
                {
                    b.Property<int>("ShiftId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ShiftID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ShiftId"));

                    b.Property<TimeOnly>("EndTime")
                        .HasColumnType("time");

                    b.Property<string>("ShiftName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<TimeOnly>("StartTime")
                        .HasColumnType("time");

                    b.HasKey("ShiftId")
                        .HasName("PK__Shifts__C0A838E1A0411B33");

                    b.ToTable("Shift");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.Staff", b =>
                {
                    b.Property<int>("StaffId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("StaffID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("StaffId"));

                    b.Property<string>("Address")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<DateOnly>("DateStartedWorking")
                        .HasColumnType("date");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("nvarchar(15)");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("StaffId")
                        .HasName("PK__Staffs__96D4AAF765015FDD");

                    b.ToTable("Staffs");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("UserID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<int?>("CustomerId")
                        .HasColumnType("int")
                        .HasColumnName("CustomerID");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("UserType")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("UserId")
                        .HasName("PK__Users__1788CCAC641C6767");

                    b.HasIndex("CustomerId");

                    b.HasIndex(new[] { "Username" }, "UQ__Users__536C85E4169A0A61")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.VoucherDetail", b =>
                {
                    b.Property<int>("VoucherId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("VoucherID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("VoucherId"));

                    b.Property<int>("PercentDiscount")
                        .HasColumnType("int");

                    b.Property<string>("VoucherCode")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<DateOnly>("VoucherEndDate")
                        .HasColumnType("date");

                    b.Property<string>("VoucherName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<DateOnly>("VoucherStartDate")
                        .HasColumnType("date");

                    b.HasKey("VoucherId")
                        .HasName("PK__VoucherD__3AEE79C169687464");

                    b.HasIndex(new[] { "VoucherCode" }, "UQ__VoucherD__7F0ABCA998F92D0B")
                        .IsUnique();

                    b.ToTable("VoucherDetails");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.Attendance", b =>
                {
                    b.HasOne("QuanLyQuanCafe.Server.Models.Schedule", "Schedule")
                        .WithMany("Attendances")
                        .HasForeignKey("ScheduleId")
                        .IsRequired()
                        .HasConstraintName("FK__Attendanc__Sched__4D94879B");

                    b.Navigation("Schedule");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.Cart", b =>
                {
                    b.HasOne("QuanLyQuanCafe.Server.Models.CustomerDetail", "Customer")
                        .WithMany("Carts")
                        .HasForeignKey("CustomerId")
                        .IsRequired()
                        .HasConstraintName("FK__Cart__CustomerID__6C190EBB");

                    b.Navigation("Customer");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.CartDetail", b =>
                {
                    b.HasOne("QuanLyQuanCafe.Server.Models.Cart", "Cart")
                        .WithMany("CartDetails")
                        .HasForeignKey("CartId")
                        .IsRequired()
                        .HasConstraintName("FK__CartDetai__CartI__6EF57B66");

                    b.HasOne("QuanLyQuanCafe.Server.Models.MenuItem", "Item")
                        .WithMany("CartDetails")
                        .HasForeignKey("ItemId")
                        .IsRequired()
                        .HasConstraintName("FK__CartDetai__ItemI__6FE99F9F");

                    b.Navigation("Cart");

                    b.Navigation("Item");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.Domain.MonthSalary", b =>
                {
                    b.HasOne("QuanLyQuanCafe.Server.Models.Salary", "Salary")
                        .WithMany()
                        .HasForeignKey("SalaryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Salary");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.ItemRecipe", b =>
                {
                    b.HasOne("QuanLyQuanCafe.Server.Models.Ingredient", "Ingredient")
                        .WithMany("ItemRecipes")
                        .HasForeignKey("IngredientId")
                        .IsRequired()
                        .HasConstraintName("FK__ItemRecip__Ingre__5FB337D6");

                    b.HasOne("QuanLyQuanCafe.Server.Models.MenuItem", "Item")
                        .WithMany("ItemRecipes")
                        .HasForeignKey("ItemId")
                        .IsRequired()
                        .HasConstraintName("FK__ItemRecip__ItemI__5EBF139D");

                    b.Navigation("Ingredient");

                    b.Navigation("Item");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.MenuItem", b =>
                {
                    b.HasOne("QuanLyQuanCafe.Server.Models.FoodType", "TypeOfFood")
                        .WithMany("MenuItems")
                        .HasForeignKey("TypeOfFoodId")
                        .IsRequired()
                        .HasConstraintName("FK__MenuItems__TypeO__571DF1D5");

                    b.Navigation("TypeOfFood");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.Order", b =>
                {
                    b.HasOne("QuanLyQuanCafe.Server.Models.CustomerDetail", "Customer")
                        .WithMany("Orders")
                        .HasForeignKey("CustomerId")
                        .IsRequired()
                        .HasConstraintName("FK__Orders__Customer__628FA481");

                    b.Navigation("Customer");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.OrderDetail", b =>
                {
                    b.HasOne("QuanLyQuanCafe.Server.Models.MenuItem", "Item")
                        .WithMany("OrderDetails")
                        .HasForeignKey("ItemId")
                        .IsRequired()
                        .HasConstraintName("FK__OrderDeta__ItemI__66603565");

                    b.HasOne("QuanLyQuanCafe.Server.Models.Order", "Order")
                        .WithMany("OrderDetails")
                        .HasForeignKey("OrderId")
                        .IsRequired()
                        .HasConstraintName("FK__OrderDeta__Order__656C112C");

                    b.Navigation("Item");

                    b.Navigation("Order");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.Salary", b =>
                {
                    b.HasOne("QuanLyQuanCafe.Server.Models.Staff", "Staff")
                        .WithMany("Salaries")
                        .HasForeignKey("StaffId")
                        .IsRequired()
                        .HasConstraintName("FK__Salary__StaffID__5165187F");

                    b.Navigation("Staff");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.Schedule", b =>
                {
                    b.HasOne("QuanLyQuanCafe.Server.Models.Shift", "Shift")
                        .WithMany("Schedules")
                        .HasForeignKey("ShiftId")
                        .IsRequired()
                        .HasConstraintName("FK__Schedules__Shift__49C3F6B7");

                    b.HasOne("QuanLyQuanCafe.Server.Models.Staff", "Staff")
                        .WithMany("Schedules")
                        .HasForeignKey("StaffId")
                        .IsRequired()
                        .HasConstraintName("FK__Schedules__Staff__48CFD27E");

                    b.Navigation("Shift");

                    b.Navigation("Staff");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.User", b =>
                {
                    b.HasOne("QuanLyQuanCafe.Server.Models.CustomerDetail", "Customer")
                        .WithMany("Users")
                        .HasForeignKey("CustomerId")
                        .HasConstraintName("FK__Users__CustomerI__4222D4EF");

                    b.Navigation("Customer");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.Cart", b =>
                {
                    b.Navigation("CartDetails");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.CustomerDetail", b =>
                {
                    b.Navigation("Carts");

                    b.Navigation("Orders");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.FoodType", b =>
                {
                    b.Navigation("MenuItems");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.Ingredient", b =>
                {
                    b.Navigation("ItemRecipes");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.MenuItem", b =>
                {
                    b.Navigation("CartDetails");

                    b.Navigation("ItemRecipes");

                    b.Navigation("OrderDetails");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.Order", b =>
                {
                    b.Navigation("OrderDetails");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.Schedule", b =>
                {
                    b.Navigation("Attendances");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.Shift", b =>
                {
                    b.Navigation("Schedules");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.Staff", b =>
                {
                    b.Navigation("Salaries");

                    b.Navigation("Schedules");
                });
#pragma warning restore 612, 618
        }
    }
}
