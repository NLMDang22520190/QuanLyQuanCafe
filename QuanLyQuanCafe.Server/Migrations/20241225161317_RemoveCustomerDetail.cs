using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuanLyQuanCafe.Server.Migrations
{
    /// <inheritdoc />
    public partial class RemoveCustomerDetail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cart_CustomerDetails_CustomerDetailCustomerId",
                table: "Cart");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_CustomerDetails_CustomerDetailCustomerId",
                table: "Orders");

            migrationBuilder.DropTable(
                name: "CustomerDetails");

            migrationBuilder.DropIndex(
                name: "IX_Orders_CustomerDetailCustomerId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Cart_CustomerDetailCustomerId",
                table: "Cart");

            migrationBuilder.DropColumn(
                name: "CustomerDetailCustomerId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "CustomerDetailCustomerId",
                table: "Cart");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CustomerDetailCustomerId",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CustomerDetailCustomerId",
                table: "Cart",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "CustomerDetails",
                columns: table => new
                {
                    CustomerID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId1 = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    AccountStatus = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true, defaultValue: "Active"),
                    CustomerAddress = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    CustomerBirthday = table.Column<DateOnly>(type: "date", nullable: true),
                    CustomerName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CustomerPhone = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    CustomerPoint = table.Column<int>(type: "int", nullable: true, defaultValue: 0),
                    CustomerStatus = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true, defaultValue: "Normal"),
                    UserID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Customer__A4AE64B89610DD0D", x => x.CustomerID);
                    table.ForeignKey(
                        name: "FK_CustomerDetails_AspNetUsers_UserId1",
                        column: x => x.UserId1,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CustomerDetailCustomerId",
                table: "Orders",
                column: "CustomerDetailCustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_Cart_CustomerDetailCustomerId",
                table: "Cart",
                column: "CustomerDetailCustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerDetails_UserId1",
                table: "CustomerDetails",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "UQ__Customer__1788CCADA42D5552",
                table: "CustomerDetails",
                column: "UserID",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Cart_CustomerDetails_CustomerDetailCustomerId",
                table: "Cart",
                column: "CustomerDetailCustomerId",
                principalTable: "CustomerDetails",
                principalColumn: "CustomerID");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_CustomerDetails_CustomerDetailCustomerId",
                table: "Orders",
                column: "CustomerDetailCustomerId",
                principalTable: "CustomerDetails",
                principalColumn: "CustomerID");
        }
    }
}
