using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjekatApi.Migrations
{
    public partial class FlightTip : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Tip",
                table: "Flights",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateCheckConstraint(
                name: "CK_Flights_Tip_Enum_Constraint",
                table: "Flights",
                sql: "[Tip] IN(0, 1)");

            
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_Flights_Tip_Enum_Constraint",
                table: "Flights");

            migrationBuilder.DropColumn(
                name: "Tip",
                table: "Flights");
        }
    }
}
