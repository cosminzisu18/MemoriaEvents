using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend_Memoria.Migrations
{
    /// <inheritdoc />
    public partial class _11thMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           

            migrationBuilder.CreateTable(
                name: "Navv",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Logo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SocialMediaId = table.Column<int>(type: "int", nullable: true),
                    ContactId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Navv", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Navv_Contact_ContactId",
                        column: x => x.ContactId,
                        principalTable: "Contact",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Navv_SocialMedia_SocialMediaId",
                        column: x => x.SocialMediaId,
                        principalTable: "SocialMedia",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Navv_ContactId",
                table: "Navv",
                column: "ContactId");

            migrationBuilder.CreateIndex(
                name: "IX_Navv_SocialMediaId",
                table: "Navv",
                column: "SocialMediaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Navv");

            migrationBuilder.AddColumn<int>(
                name: "NavvId",
                table: "TitleSubtitle",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TitleSubtitle_NavvId",
                table: "TitleSubtitle",
                column: "NavvId");
        }
    }
}
