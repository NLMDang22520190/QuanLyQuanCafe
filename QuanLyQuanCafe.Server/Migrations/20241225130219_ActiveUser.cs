using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuanLyQuanCafe.Server.Migrations
{
    /// <inheritdoc />
    public partial class ActiveUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__CartDetai__CartI__6EF57B66",
                table: "CartDetails");

            //migrationBuilder.AddColumn<double>(
            //    name: "MinOrderAmount",
            //    table: "VoucherDetails",
            //    type: "float",
            //    nullable: false,
            //    defaultValue: 0.0);

            //migrationBuilder.AddColumn<int>(
            //    name: "PointsRequired",
            //    table: "VoucherDetails",
            //    type: "int",
            //    nullable: false,
            //    defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "isActive",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_CartDetails_Cart_CartID",
                table: "CartDetails",
                column: "CartID",
                principalTable: "Cart",
                principalColumn: "CartID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartDetails_Cart_CartID",
                table: "CartDetails");

            migrationBuilder.DropColumn(
                name: "MinOrderAmount",
                table: "VoucherDetails");

            migrationBuilder.DropColumn(
                name: "PointsRequired",
                table: "VoucherDetails");

            migrationBuilder.DropColumn(
                name: "isActive",
                table: "AspNetUsers");

            migrationBuilder.AddForeignKey(
                name: "FK__CartDetai__CartI__6EF57B66",
                table: "CartDetails",
                column: "CartID",
                principalTable: "Cart",
                principalColumn: "CartID");
        }
    }
}
