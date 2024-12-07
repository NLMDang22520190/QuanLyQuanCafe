using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuanLyQuanCafe.Server.Migrations
{
    /// <inheritdoc />
    public partial class tblsalary : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Factor",
                table: "Salary");

            migrationBuilder.DropColumn(
                name: "IsPaid",
                table: "Salary");

            migrationBuilder.DropColumn(
                name: "SalaryBase",
                table: "Salary");

            migrationBuilder.DropColumn(
                name: "SalaryEarned",
                table: "Salary");

            migrationBuilder.RenameColumn(
                name: "HourWorked",
                table: "Salary",
                newName: "HourWage");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Salary",
                newName: "StartDate");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StartDate",
                table: "Salary",
                newName: "Date");

            migrationBuilder.RenameColumn(
                name: "HourWage",
                table: "Salary",
                newName: "HourWorked");

            migrationBuilder.AddColumn<double>(
                name: "Factor",
                table: "Salary",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<bool>(
                name: "IsPaid",
                table: "Salary",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<double>(
                name: "SalaryBase",
                table: "Salary",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "SalaryEarned",
                table: "Salary",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
