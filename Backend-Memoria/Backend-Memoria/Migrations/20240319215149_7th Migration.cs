using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend_Memoria.Migrations
{
    /// <inheritdoc />
    public partial class _7thMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Prices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PhotoUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TitleService = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OldPrice = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false),
                    Hours = table.Column<int>(type: "int", nullable: false),
                    TitleSubtitleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Prices_TitleSubtitle_TitleSubtitleId",
                        column: x => x.TitleSubtitleId,
                        principalTable: "TitleSubtitle",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Prices_TitleSubtitleId",
                table: "Prices",
                column: "TitleSubtitleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Prices");
        }
    }
}
