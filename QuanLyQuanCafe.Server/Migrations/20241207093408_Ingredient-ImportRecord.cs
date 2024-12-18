using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuanLyQuanCafe.Server.Migrations
{
    /// <inheritdoc />
    public partial class IngredientImportRecord : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateImported",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "ExpiryDate",
                table: "Ingredients");

            migrationBuilder.RenameTable(
                name: "Ingredients",
                newName: "Ingredient");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "Ingredient",
                newName: "Ingredients");

            migrationBuilder.AddColumn<DateOnly>(
                name: "DateImported",
                table: "Ingredients",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<DateOnly>(
                name: "ExpiryDate",
                table: "Ingredients",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));
        }
    }
}
