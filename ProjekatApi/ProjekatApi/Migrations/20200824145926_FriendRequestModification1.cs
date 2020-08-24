using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjekatApi.Migrations
{
    public partial class FriendRequestModification1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SenderCity",
                table: "FriendRequests",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SenderFirstName",
                table: "FriendRequests",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SenderLastName",
                table: "FriendRequests",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "ApplicationUser",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationUser_ApplicationUserId",
                table: "ApplicationUser",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ApplicationUser_ApplicationUser_ApplicationUserId",
                table: "ApplicationUser",
                column: "ApplicationUserId",
                principalTable: "ApplicationUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApplicationUser_ApplicationUser_ApplicationUserId",
                table: "ApplicationUser");

            migrationBuilder.DropIndex(
                name: "IX_ApplicationUser_ApplicationUserId",
                table: "ApplicationUser");

            migrationBuilder.DropColumn(
                name: "SenderCity",
                table: "FriendRequests");

            migrationBuilder.DropColumn(
                name: "SenderFirstName",
                table: "FriendRequests");

            migrationBuilder.DropColumn(
                name: "SenderLastName",
                table: "FriendRequests");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "ApplicationUser");
        }
    }
}
