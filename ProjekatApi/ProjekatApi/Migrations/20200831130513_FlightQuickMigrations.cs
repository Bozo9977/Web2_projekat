using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjekatApi.Migrations
{
    public partial class FlightQuickMigrations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FlightQuickReservations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Departure = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Arrival = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TakeOff = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SeatNo = table.Column<int>(type: "int", nullable: false),
                    Class = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Discount = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightQuickReservations", x => x.Id);
                    table.CheckConstraint("CK_FlightQuickReservations_Class_Enum_Constraint", "[Class] IN(0, 1, 2)");
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FlightQuickReservations");
        }
    }
}
