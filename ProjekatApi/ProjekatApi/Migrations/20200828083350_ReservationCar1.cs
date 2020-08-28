using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjekatApi.Migrations
{
    public partial class ReservationCar1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "IdCompany",
                table: "ReservationCar",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Price",
                table: "ReservationCar",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdCompany",
                table: "ReservationCar");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "ReservationCar");
        }
    }
}
