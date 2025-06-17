using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class addingHost : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Icon",
                table: "TypeHebergements",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "HostEntityId",
                table: "Listings",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SousTypeHebergementId",
                table: "Listings",
                type: "int",
                nullable: true,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Listings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Listings",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "Hosts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JoinedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Rating = table.Column<double>(type: "float", nullable: false),
                    TotalReviews = table.Column<int>(type: "int", nullable: false),
                    TotalBookings = table.Column<int>(type: "int", nullable: false),
                    IsVerified = table.Column<bool>(type: "bit", nullable: false),
                    VerifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hosts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Hosts_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SousTypeHebergement",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Icon = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SousTypeHebergement", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SousTypeByHebergements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TypeHebergementId = table.Column<int>(type: "int", nullable: false),
                    SousTypeHebergementId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SousTypeByHebergements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SousTypeByHebergements_SousTypeHebergement_SousTypeHebergementId",
                        column: x => x.SousTypeHebergementId,
                        principalTable: "SousTypeHebergement",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SousTypeByHebergements_TypeHebergements_TypeHebergementId",
                        column: x => x.TypeHebergementId,
                        principalTable: "TypeHebergements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Listings_HostEntityId",
                table: "Listings",
                column: "HostEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_Listings_SousTypeHebergementId",
                table: "Listings",
                column: "SousTypeHebergementId");

            migrationBuilder.CreateIndex(
                name: "IX_Listings_UserId",
                table: "Listings",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Hosts_UserId",
                table: "Hosts",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SousTypeByHebergements_SousTypeHebergementId",
                table: "SousTypeByHebergements",
                column: "SousTypeHebergementId");

            migrationBuilder.CreateIndex(
                name: "IX_SousTypeByHebergements_TypeHebergementId",
                table: "SousTypeByHebergements",
                column: "TypeHebergementId");

            migrationBuilder.AddForeignKey(
                name: "FK_Listings_AspNetUsers_UserId",
                table: "Listings",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Listings_Hosts_HostEntityId",
                table: "Listings",
                column: "HostEntityId",
                principalTable: "Hosts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Listings_SousTypeHebergement_SousTypeHebergementId",
                table: "Listings",
                column: "SousTypeHebergementId",
                principalTable: "SousTypeHebergement",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Listings_AspNetUsers_UserId",
                table: "Listings");

            migrationBuilder.DropForeignKey(
                name: "FK_Listings_Hosts_HostEntityId",
                table: "Listings");

            migrationBuilder.DropForeignKey(
                name: "FK_Listings_SousTypeHebergement_SousTypeHebergementId",
                table: "Listings");

            migrationBuilder.DropTable(
                name: "Hosts");

            migrationBuilder.DropTable(
                name: "SousTypeByHebergements");

            migrationBuilder.DropTable(
                name: "SousTypeHebergement");

            migrationBuilder.DropIndex(
                name: "IX_Listings_HostEntityId",
                table: "Listings");

            migrationBuilder.DropIndex(
                name: "IX_Listings_SousTypeHebergementId",
                table: "Listings");

            migrationBuilder.DropIndex(
                name: "IX_Listings_UserId",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "Icon",
                table: "TypeHebergements");

            migrationBuilder.DropColumn(
                name: "HostEntityId",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "SousTypeHebergementId",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "AspNetUsers");
        }
    }
}
