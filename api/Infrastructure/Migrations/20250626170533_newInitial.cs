using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class newInitial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Listings_SousTypeHebergement_SousTypeHebergementId",
                table: "Listings");

            migrationBuilder.DropForeignKey(
                name: "FK_SousTypeByHebergements_SousTypeHebergement_SousTypeHebergementId",
                table: "SousTypeByHebergements");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SousTypeHebergement",
                table: "SousTypeHebergement");

            migrationBuilder.DropColumn(
                name: "NbreDouches",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "PersoSuppl",
                table: "ListingPrices");

            migrationBuilder.DropColumn(
                name: "Reduction",
                table: "ListingPrices");

            migrationBuilder.DropColumn(
                name: "ReductionHebdo",
                table: "ListingPrices");

            migrationBuilder.DropColumn(
                name: "ReductionMensu",
                table: "ListingPrices");

            migrationBuilder.RenameTable(
                name: "SousTypeHebergement",
                newName: "SousTypeHebergements");

            migrationBuilder.AddColumn<string>(
                name: "WhoElseOnSite",
                table: "Listings",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_SousTypeHebergements",
                table: "SousTypeHebergements",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "BathroomTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BathroomTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Discounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Percentage = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Discounts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WhoInSites",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Icon = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WhoInSites", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ListingBathroomType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ListingId = table.Column<int>(type: "int", nullable: false),
                    BathroomTypeId = table.Column<int>(type: "int", nullable: false),
                    Count = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListingBathroomType", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ListingBathroomType_BathroomTypes_BathroomTypeId",
                        column: x => x.BathroomTypeId,
                        principalTable: "BathroomTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ListingBathroomType_Listings_ListingId",
                        column: x => x.ListingId,
                        principalTable: "Listings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ListingDiscount",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ListingId = table.Column<int>(type: "int", nullable: false),
                    DiscountId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListingDiscount", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ListingDiscount_Discounts_DiscountId",
                        column: x => x.DiscountId,
                        principalTable: "Discounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ListingDiscount_Listings_ListingId",
                        column: x => x.ListingId,
                        principalTable: "Listings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ListingBathroomType_BathroomTypeId",
                table: "ListingBathroomType",
                column: "BathroomTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ListingBathroomType_ListingId",
                table: "ListingBathroomType",
                column: "ListingId");

            migrationBuilder.CreateIndex(
                name: "IX_ListingDiscount_DiscountId",
                table: "ListingDiscount",
                column: "DiscountId");

            migrationBuilder.CreateIndex(
                name: "IX_ListingDiscount_ListingId",
                table: "ListingDiscount",
                column: "ListingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Listings_SousTypeHebergements_SousTypeHebergementId",
                table: "Listings",
                column: "SousTypeHebergementId",
                principalTable: "SousTypeHebergements",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SousTypeByHebergements_SousTypeHebergements_SousTypeHebergementId",
                table: "SousTypeByHebergements",
                column: "SousTypeHebergementId",
                principalTable: "SousTypeHebergements",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Listings_SousTypeHebergements_SousTypeHebergementId",
                table: "Listings");

            migrationBuilder.DropForeignKey(
                name: "FK_SousTypeByHebergements_SousTypeHebergements_SousTypeHebergementId",
                table: "SousTypeByHebergements");

            migrationBuilder.DropTable(
                name: "ListingBathroomType");

            migrationBuilder.DropTable(
                name: "ListingDiscount");

            migrationBuilder.DropTable(
                name: "WhoInSites");

            migrationBuilder.DropTable(
                name: "BathroomTypes");

            migrationBuilder.DropTable(
                name: "Discounts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SousTypeHebergements",
                table: "SousTypeHebergements");

            migrationBuilder.DropColumn(
                name: "WhoElseOnSite",
                table: "Listings");

            migrationBuilder.RenameTable(
                name: "SousTypeHebergements",
                newName: "SousTypeHebergement");

            migrationBuilder.AddColumn<int>(
                name: "NbreDouches",
                table: "Listings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "PersoSuppl",
                table: "ListingPrices",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Reduction",
                table: "ListingPrices",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "ReductionHebdo",
                table: "ListingPrices",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "ReductionMensu",
                table: "ListingPrices",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddPrimaryKey(
                name: "PK_SousTypeHebergement",
                table: "SousTypeHebergement",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Listings_SousTypeHebergement_SousTypeHebergementId",
                table: "Listings",
                column: "SousTypeHebergementId",
                principalTable: "SousTypeHebergement",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SousTypeByHebergements_SousTypeHebergement_SousTypeHebergementId",
                table: "SousTypeByHebergements",
                column: "SousTypeHebergementId",
                principalTable: "SousTypeHebergement",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
