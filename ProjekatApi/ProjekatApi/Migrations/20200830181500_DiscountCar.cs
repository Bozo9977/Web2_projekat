using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjekatApi.Migrations
{
    public partial class DiscountCar : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DiscountCars",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    StartDay = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDay = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Cena = table.Column<float>(type: "real", nullable: false),
                    Procenat = table.Column<int>(type: "int", nullable: false),
                    NovaCena = table.Column<int>(type: "int", nullable: false),
                    carId = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiscountCars", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DiscountCars");
        }
    }
}
