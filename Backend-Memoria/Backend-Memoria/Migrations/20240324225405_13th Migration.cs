using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend_Memoria.Migrations
{
    /// <inheritdoc />
    public partial class _13thMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {



        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Subtitle",
                table: "Abouts");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Abouts");

            migrationBuilder.AddColumn<int>(
                name: "TitleSubtitleId",
                table: "Abouts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Abouts_TitleSubtitleId",
                table: "Abouts",
                column: "TitleSubtitleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Abouts_TitleSubtitle_TitleSubtitleId",
                table: "Abouts",
                column: "TitleSubtitleId",
                principalTable: "TitleSubtitle",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
