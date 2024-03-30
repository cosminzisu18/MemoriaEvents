using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend_Memoria.Migrations
{
    /// <inheritdoc />
    public partial class _10thMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PricesCharacteristics_Prices_PricesId",
                table: "PricesCharacteristics");

            migrationBuilder.DropColumn(
                name: "PriceId",
                table: "PricesCharacteristics");

            migrationBuilder.AlterColumn<int>(
                name: "PricesId",
                table: "PricesCharacteristics",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PricesCharacteristics_Prices_PricesId",
                table: "PricesCharacteristics",
                column: "PricesId",
                principalTable: "Prices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PricesCharacteristics_Prices_PricesId",
                table: "PricesCharacteristics");

            migrationBuilder.AlterColumn<int>(
                name: "PricesId",
                table: "PricesCharacteristics",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "PriceId",
                table: "PricesCharacteristics",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_PricesCharacteristics_Prices_PricesId",
                table: "PricesCharacteristics",
                column: "PricesId",
                principalTable: "Prices",
                principalColumn: "Id");
        }
    }
}
