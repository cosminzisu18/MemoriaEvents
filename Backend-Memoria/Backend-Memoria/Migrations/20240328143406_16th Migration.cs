using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend_Memoria.Migrations
{
    /// <inheritdoc />
    public partial class _16thMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PackageService_Packages_PackageId",
                table: "PackageService");

            migrationBuilder.DropForeignKey(
                name: "FK_PackageService_Services_ServiceId",
                table: "PackageService");

            migrationBuilder.AddColumn<int>(
                name: "PackagesId",
                table: "Services",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Services_PackagesId",
                table: "Services",
                column: "PackagesId");

            migrationBuilder.AddForeignKey(
                name: "FK_PackageService_Packages_PackageId",
                table: "PackageService",
                column: "PackageId",
                principalTable: "Packages",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_PackageService_Services_ServiceId",
                table: "PackageService",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Services_Packages_PackagesId",
                table: "Services",
                column: "PackagesId",
                principalTable: "Packages",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PackageService_Packages_PackageId",
                table: "PackageService");

            migrationBuilder.DropForeignKey(
                name: "FK_PackageService_Services_ServiceId",
                table: "PackageService");

            migrationBuilder.DropForeignKey(
                name: "FK_Services_Packages_PackagesId",
                table: "Services");

            migrationBuilder.DropIndex(
                name: "IX_Services_PackagesId",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "PackagesId",
                table: "Services");

            migrationBuilder.AddForeignKey(
                name: "FK_PackageService_Packages_PackageId",
                table: "PackageService",
                column: "PackageId",
                principalTable: "Packages",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PackageService_Services_ServiceId",
                table: "PackageService",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "Id");
        }
    }
}
