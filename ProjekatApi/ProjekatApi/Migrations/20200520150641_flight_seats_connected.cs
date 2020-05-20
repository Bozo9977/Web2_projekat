using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjekatApi.Migrations
{
    public partial class flight_seats_connected : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FlightId",
                table: "FlightSeats",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_FlightSeats_FlightId",
                table: "FlightSeats",
                column: "FlightId");

            migrationBuilder.AddForeignKey(
                name: "FK_FlightSeats_Flights_FlightId",
                table: "FlightSeats",
                column: "FlightId",
                principalTable: "Flights",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FlightSeats_Flights_FlightId",
                table: "FlightSeats");

            migrationBuilder.DropIndex(
                name: "IX_FlightSeats_FlightId",
                table: "FlightSeats");

            migrationBuilder.DropColumn(
                name: "FlightId",
                table: "FlightSeats");
        }
    }
}
