using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuanLyQuanCafe.Server.Migrations
{
    /// <inheritdoc />
    public partial class shiftscheduleattendance : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsAbsent",
                table: "Attendance");

            migrationBuilder.DropColumn(
                name: "DayOfWeek",
                table: "Schedules");

            migrationBuilder.RenameTable(
                name: "Shifts",
                newName: "Shift");

            migrationBuilder.RenameTable(
                name: "Schedules",
                newName: "Schedule");

            migrationBuilder.RenameIndex(
                name: "IX_Schedules_StaffID",
                table: "Schedule",
                newName: "IX_Schedule_StaffID");

            migrationBuilder.RenameIndex(
                name: "IX_Schedules_ShiftID",
                table: "Schedule",
                newName: "IX_Schedule_ShiftID");

            migrationBuilder.AddColumn<DateTime>(
                name: "Checkin",
                table: "Attendance",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Checkout",
                table: "Attendance",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateOnly>(
                name: "EndDate",
                table: "Schedule",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<DateOnly>(
                name: "StartDate",
                table: "Schedule",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Checkin",
                table: "Attendance");

            migrationBuilder.DropColumn(
                name: "Checkout",
                table: "Attendance");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Schedule");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "Schedule");

            migrationBuilder.RenameTable(
                name: "Shift",
                newName: "Shifts");

            migrationBuilder.RenameTable(
                name: "Schedule",
                newName: "Schedules");

            migrationBuilder.RenameIndex(
                name: "IX_Schedule_StaffID",
                table: "Schedules",
                newName: "IX_Schedules_StaffID");

            migrationBuilder.RenameIndex(
                name: "IX_Schedule_ShiftID",
                table: "Schedules",
                newName: "IX_Schedules_ShiftID");

            migrationBuilder.AddColumn<bool>(
                name: "IsAbsent",
                table: "Attendance",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "DayOfWeek",
                table: "Schedules",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");
        }
    }
}
