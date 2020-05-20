using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjekatApi.Migrations
{
    public partial class connecting_Flight_Destination : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Destinations_Flights_FlightId",
                table: "Destinations");

            migrationBuilder.DropIndex(
                name: "IX_Destinations_FlightId",
                table: "Destinations");

            migrationBuilder.DropColumn(
                name: "FlightId",
                table: "Destinations");

            migrationBuilder.CreateTable(
                name: "FlightDestinations",
                columns: table => new
                {
                    FlightId = table.Column<int>(type: "int", nullable: false),
                    DestinationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightDestinations", x => new { x.DestinationId, x.FlightId });
                    table.ForeignKey(
                        name: "FK_FlightDestinations_Destinations_DestinationId",
                        column: x => x.DestinationId,
                        principalTable: "Destinations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FlightDestinations_Flights_FlightId",
                        column: x => x.FlightId,
                        principalTable: "Flights",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FlightDestinations_FlightId",
                table: "FlightDestinations",
                column: "FlightId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FlightDestinations");

            migrationBuilder.AddColumn<int>(
                name: "FlightId",
                table: "Destinations",
                type: "int",
                nullable: true);

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
    }
}
