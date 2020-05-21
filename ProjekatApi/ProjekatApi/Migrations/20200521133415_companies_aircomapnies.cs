using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjekatApi.Migrations
{
    public partial class companies_aircomapnies : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AircompanyId",
                table: "Flights",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AircompanyId",
                table: "Destinations",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Flights_AircompanyId",
                table: "Flights",
                column: "AircompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Destinations_AircompanyId",
                table: "Destinations",
                column: "AircompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Destinations_Companies_AircompanyId",
                table: "Destinations",
                column: "AircompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Flights_Companies_AircompanyId",
                table: "Flights",
                column: "AircompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Destinations_Companies_AircompanyId",
                table: "Destinations");

            migrationBuilder.DropForeignKey(
                name: "FK_Flights_Companies_AircompanyId",
                table: "Flights");

            migrationBuilder.DropTable(
                name: "Companies");

            migrationBuilder.DropIndex(
                name: "IX_Flights_AircompanyId",
                table: "Flights");

            migrationBuilder.DropIndex(
                name: "IX_Destinations_AircompanyId",
                table: "Destinations");

            migrationBuilder.DropColumn(
                name: "AircompanyId",
                table: "Flights");

            migrationBuilder.DropColumn(
                name: "AircompanyId",
                table: "Destinations");
        }
    }
}
