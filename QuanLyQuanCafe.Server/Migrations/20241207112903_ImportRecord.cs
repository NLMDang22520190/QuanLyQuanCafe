using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuanLyQuanCafe.Server.Migrations
{
    /// <inheritdoc />
    public partial class ImportRecord : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ImportRecord",
                columns: table => new
                {
                    ImportRecordId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IngredientId = table.Column<int>(type: "int", nullable: false),
                    DateImport = table.Column<DateOnly>(type: "date", nullable: false),
                    QuantityImport = table.Column<double>(type: "float", nullable: false),
                    ImportPrice = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImportRecord", x => x.ImportRecordId);
                    table.ForeignKey(
                        name: "FK_ImportRecord_Ingredient_IngredientId",
                        column: x => x.IngredientId,
                        principalTable: "Ingredient",
                        principalColumn: "IngredientID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ImportRecord_IngredientId",
                table: "ImportRecord",
                column: "IngredientId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ImportRecord");
        }
    }
}
