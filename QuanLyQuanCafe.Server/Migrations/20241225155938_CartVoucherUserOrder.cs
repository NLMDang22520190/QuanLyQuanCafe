using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuanLyQuanCafe.Server.Migrations
{
    /// <inheritdoc />
    public partial class CartVoucherUserOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_CustomerDetails_CustomerId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK__Cart__CustomerID__6C190EBB",
                table: "Cart");

            migrationBuilder.DropForeignKey(
                name: "FK__Orders__Customer__628FA481",
                table: "Orders");

            //migrationBuilder.DropIndex(
            //    name: "IX_Orders_CustomerID",
            //    table: "Orders");

            //migrationBuilder.DropIndex(
            //    name: "IX_Cart_CustomerID",
            //    table: "Cart");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_CustomerId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "CustomerID",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "CustomerID",
                table: "Cart");

            migrationBuilder.RenameColumn(
                name: "CustomerId",
                table: "AspNetUsers",
                newName: "CustomerPoint");

            migrationBuilder.AddColumn<int>(
                name: "CustomerDetailCustomerId",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Orders",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId1",
                table: "CustomerDetails",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CustomerDetailCustomerId",
                table: "Cart",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Cart",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CustomerDetailCustomerId",
                table: "Orders",
                column: "CustomerDetailCustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerDetails_UserId1",
                table: "CustomerDetails",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_Cart_CustomerDetailCustomerId",
                table: "Cart",
                column: "CustomerDetailCustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_Cart_UserId",
                table: "Cart",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cart_AspNetUsers_UserId",
                table: "Cart",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Cart_CustomerDetails_CustomerDetailCustomerId",
                table: "Cart",
                column: "CustomerDetailCustomerId",
                principalTable: "CustomerDetails",
                principalColumn: "CustomerID");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerDetails_AspNetUsers_UserId1",
                table: "CustomerDetails",
                column: "UserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AspNetUsers_UserId",
                table: "Orders",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_CustomerDetails_CustomerDetailCustomerId",
                table: "Orders",
                column: "CustomerDetailCustomerId",
                principalTable: "CustomerDetails",
                principalColumn: "CustomerID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cart_AspNetUsers_UserId",
                table: "Cart");

            migrationBuilder.DropForeignKey(
                name: "FK_Cart_CustomerDetails_CustomerDetailCustomerId",
                table: "Cart");

            migrationBuilder.DropForeignKey(
                name: "FK_CustomerDetails_AspNetUsers_UserId1",
                table: "CustomerDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_UserId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_CustomerDetails_CustomerDetailCustomerId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_CustomerDetailCustomerId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_UserId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_CustomerDetails_UserId1",
                table: "CustomerDetails");

            migrationBuilder.DropIndex(
                name: "IX_Cart_CustomerDetailCustomerId",
                table: "Cart");

            migrationBuilder.DropIndex(
                name: "IX_Cart_UserId",
                table: "Cart");

            migrationBuilder.DropColumn(
                name: "CustomerDetailCustomerId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "CustomerDetails");

            migrationBuilder.DropColumn(
                name: "CustomerDetailCustomerId",
                table: "Cart");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Cart");

            migrationBuilder.RenameColumn(
                name: "CustomerPoint",
                table: "AspNetUsers",
                newName: "CustomerId");

            migrationBuilder.AddColumn<int>(
                name: "CustomerID",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CustomerID",
                table: "Cart",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CustomerID",
                table: "Orders",
                column: "CustomerID");

            migrationBuilder.CreateIndex(
                name: "IX_Cart_CustomerID",
                table: "Cart",
                column: "CustomerID");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_CustomerId",
                table: "AspNetUsers",
                column: "CustomerId",
                unique: true,
                filter: "[CustomerId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_CustomerDetails_CustomerId",
                table: "AspNetUsers",
                column: "CustomerId",
                principalTable: "CustomerDetails",
                principalColumn: "CustomerID");

            migrationBuilder.AddForeignKey(
                name: "FK__Cart__CustomerID__6C190EBB",
                table: "Cart",
                column: "CustomerID",
                principalTable: "CustomerDetails",
                principalColumn: "CustomerID");

            migrationBuilder.AddForeignKey(
                name: "FK__Orders__Customer__628FA481",
                table: "Orders",
                column: "CustomerID",
                principalTable: "CustomerDetails",
                principalColumn: "CustomerID");
        }
    }
}
