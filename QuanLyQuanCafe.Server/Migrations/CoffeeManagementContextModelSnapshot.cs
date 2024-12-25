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

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("CustomerPoint")
                        .HasColumnType("int");

                    b.Property<string>("District")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("PhotoUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("Ward")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("isActive")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);
                });

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

                    b.Property<DateTime>("LastUpdated")
                        .HasColumnType("datetime");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("CartId")
                        .HasName("PK__Cart__51BCD79719E1986C");

                    b.HasIndex("UserId");

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

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.ImportRecord", b =>
                {
                    b.Property<int>("ImportRecordId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ImportRecordId"));

                    b.Property<DateOnly>("DateImport")
                        .HasColumnType("date");

                    b.Property<double>("ImportPrice")
                        .HasColumnType("float");

                    b.Property<int>("IngredientId")
                        .HasColumnType("int");

                    b.Property<double>("QuantityImport")
                        .HasColumnType("float");

                    b.HasKey("ImportRecordId");

                    b.HasIndex("IngredientId");

                    b.ToTable("ImportRecord");
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

                    b.ToTable("Ingredient");
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

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("UserId");

                    b.Property<int?>("VoucherApplied")
                        .HasColumnType("int");

                    b.HasKey("OrderId")
                        .HasName("PK__Orders__C3905BAFC52D5F48");

                    b.HasIndex("UserId");

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

                    b.Property<DateTime?>("DateEndWorking")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateStartedWorking")
                        .HasColumnType("datetime2");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("StaffId")
                        .HasName("PK__Staffs__96D4AAF765015FDD");

                    b.HasIndex("UserId");

                    b.ToTable("Staff");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.VoucherDetail", b =>
                {
                    b.Property<int>("VoucherId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("VoucherID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("VoucherId"));

                    b.Property<double>("MinOrderAmount")
                        .HasColumnType("float");

                    b.Property<int>("PercentDiscount")
                        .HasColumnType("int");

                    b.Property<int>("PointsRequired")
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

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("QuanLyQuanCafe.Server.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("QuanLyQuanCafe.Server.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("QuanLyQuanCafe.Server.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("QuanLyQuanCafe.Server.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
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
                    b.HasOne("QuanLyQuanCafe.Server.Models.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.CartDetail", b =>
                {
                    b.HasOne("QuanLyQuanCafe.Server.Models.Cart", "Cart")
                        .WithMany()
                        .HasForeignKey("CartId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

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

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.ImportRecord", b =>
                {
                    b.HasOne("QuanLyQuanCafe.Server.Models.Ingredient", "Ingredient")
                        .WithMany()
                        .HasForeignKey("IngredientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Ingredient");
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
                    b.HasOne("QuanLyQuanCafe.Server.Models.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("User");
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

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.Staff", b =>
                {
                    b.HasOne("QuanLyQuanCafe.Server.Models.ApplicationUser", "User")
                        .WithMany("Staffs")
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("QuanLyQuanCafe.Server.Models.ApplicationUser", b =>
                {
                    b.Navigation("Staffs");
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
