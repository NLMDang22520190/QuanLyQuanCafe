using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuanLyQuanCafe.Server.Migrations
{
    /// <inheritdoc />
    public partial class StaffMi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Staffs");

            migrationBuilder.DropColumn(
                name: "FullName",
                table: "Staffs");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Staffs");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "Staffs");

            migrationBuilder.RenameTable(
                name: "Staffs",
                newName: "Staff");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateStartedWorking",
                table: "Staff",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateEndWorking",
                table: "Staff",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Staff",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Staff_UserId",
                table: "Staff",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Staff_AspNetUsers_UserId",
                table: "Staff",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Staff_AspNetUsers_UserId",
                table: "Staff");

            migrationBuilder.DropIndex(
                name: "IX_Staff_UserId",
                table: "Staff");

            migrationBuilder.DropColumn(
                name: "DateEndWorking",
                table: "Staff");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Staff");

            migrationBuilder.RenameTable(
                name: "Staff",
                newName: "Staffs");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "DateStartedWorking",
                table: "Staffs",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Staffs",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "Staffs",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Staffs",
                type: "nvarchar(15)",
                maxLength: 15,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "Staffs",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");
        }
    }
}
