using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjekatApi.Migrations
{
    public partial class fligts_beggining : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FlightId",
                table: "Destinations",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Flights",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Departure = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Arrival = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TakeOff = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TouchDown = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Length = table.Column<int>(type: "int", nullable: false),
                    PriceFirst = table.Column<double>(type: "float", nullable: false),
                    NumberFirst = table.Column<int>(type: "int", nullable: false),
                    PriceBusiness = table.Column<double>(type: "float", nullable: false),
                    NumberBusiness = table.Column<int>(type: "int", nullable: false),
                    PriceEconomy = table.Column<double>(type: "float", nullable: false),
                    NumberEconomy = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Flights", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Destinations_FlightId",
                table: "Destinations",
                column: "FlightId");

            migrationBuilder.AddForeignKey(
                name: "FK_Destinations_Flights_FlightId",
                table: "Destinations",
                column: "FlightId",
                principalTable: "Flights",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Destinations_Flights_FlightId",
                table: "Destinations");

            migrationBuilder.DropTable(
                name: "Flights");

            migrationBuilder.DropIndex(
                name: "IX_Destinations_FlightId",
                table: "Destinations");

            migrationBuilder.DropColumn(
                name: "FlightId",
                table: "Destinations");
        }
    }
}
