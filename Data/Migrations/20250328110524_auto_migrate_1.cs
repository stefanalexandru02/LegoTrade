using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LegoTrade.Data.Migrations
{
    /// <inheritdoc />
    public partial class automigrate1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "InventoryItems",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    ItemId = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    Quantity = table.Column<int>(type: "INTEGER", nullable: false),
                    Condition = table.Column<int>(type: "INTEGER", nullable: false),
                    Notes = table.Column<string>(type: "TEXT", maxLength: 500, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InventoryItems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LegoParts",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    PartNumber = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LegoParts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LegoSets",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    SetNumber = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LegoSets", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_InventoryItems_ItemId",
                table: "InventoryItems",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_LegoParts_PartNumber",
                table: "LegoParts",
                column: "PartNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_LegoSets_SetNumber",
                table: "LegoSets",
                column: "SetNumber",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InventoryItems");

            migrationBuilder.DropTable(
                name: "LegoParts");

            migrationBuilder.DropTable(
                name: "LegoSets");
        }
    }
}
