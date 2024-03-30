using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend_Memoria.Migrations
{
    /// <inheritdoc />
    public partial class _4thMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Header",
                table: "Header");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AdminUser",
                table: "AdminUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_About",
                table: "About");

            migrationBuilder.DropColumn(
                name: "IconQualities",
                table: "About");

            migrationBuilder.DropColumn(
                name: "TextQualities",
                table: "About");

            migrationBuilder.DropColumn(
                name: "TitleQualities",
                table: "About");

            migrationBuilder.RenameTable(
                name: "Header",
                newName: "Headers");

            migrationBuilder.RenameTable(
                name: "AdminUser",
                newName: "AdminUsers");

            migrationBuilder.RenameTable(
                name: "About",
                newName: "Abouts");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Headers",
                table: "Headers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AdminUsers",
                table: "AdminUsers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Abouts",
                table: "Abouts",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "AboutQualities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IconQualities = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TitleQualities = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TextQualities = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AboutId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AboutQualities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AboutQualities_Abouts_AboutId",
                        column: x => x.AboutId,
                        principalTable: "Abouts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AboutQualities_AboutId",
                table: "AboutQualities",
                column: "AboutId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AboutQualities");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Headers",
                table: "Headers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AdminUsers",
                table: "AdminUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Abouts",
                table: "Abouts");

            migrationBuilder.RenameTable(
                name: "Headers",
                newName: "Header");

            migrationBuilder.RenameTable(
                name: "AdminUsers",
                newName: "AdminUser");

            migrationBuilder.RenameTable(
                name: "Abouts",
                newName: "About");

            migrationBuilder.AddColumn<string>(
                name: "IconQualities",
                table: "About",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TextQualities",
                table: "About",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TitleQualities",
                table: "About",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Header",
                table: "Header",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AdminUser",
                table: "AdminUser",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_About",
                table: "About",
                column: "Id");
        }
    }
}
