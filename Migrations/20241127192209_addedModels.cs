using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HouseRules.Migrations
{
    /// <inheritdoc />
    public partial class addedModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Chores",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Difficulty = table.Column<int>(type: "integer", nullable: false),
                    ChoreFrequencyDays = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chores", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ChoreCompletions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserProfileId = table.Column<int>(type: "integer", nullable: false),
                    ChoreId = table.Column<int>(type: "integer", nullable: false),
                    CompletedOn = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChoreCompletions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChoreCompletions_Chores_ChoreId",
                        column: x => x.ChoreId,
                        principalTable: "Chores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChoreCompletions_UserProfiles_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ChoreUserProfile",
                columns: table => new
                {
                    ChoresId = table.Column<int>(type: "integer", nullable: false),
                    UserProfilesId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChoreUserProfile", x => new { x.ChoresId, x.UserProfilesId });
                    table.ForeignKey(
                        name: "FK_ChoreUserProfile_Chores_ChoresId",
                        column: x => x.ChoresId,
                        principalTable: "Chores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChoreUserProfile_UserProfiles_UserProfilesId",
                        column: x => x.UserProfilesId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "518d1b72-8754-4134-aa70-de78acfc8764", "AQAAAAIAAYagAAAAEMooVSyD26cS7dcz/2Th4yK8Xw48KiQdvNerY8ZCUPYVCor7HM1Xy9aBgopVN2R48A==", "0efb95c5-cad5-4c82-96e9-43f35706a583" });

            migrationBuilder.InsertData(
                table: "Chores",
                columns: new[] { "Id", "ChoreFrequencyDays", "Difficulty", "Name" },
                values: new object[,]
                {
                    { 1, 7, 3, "Vacuum the house" },
                    { 2, 1, 2, "Wash the dishes" },
                    { 3, 14, 4, "Mow the lawn" },
                    { 4, 10, 5, "Clean the bathroom" },
                    { 5, 2, 1, "Take out the trash" }
                });

            migrationBuilder.InsertData(
                table: "ChoreCompletions",
                columns: new[] { "Id", "ChoreId", "CompletedOn", "UserProfileId" },
                values: new object[,]
                {
                    { 1, 2, new DateTime(2024, 11, 26, 13, 22, 9, 558, DateTimeKind.Local).AddTicks(4710), 1 },
                    { 2, 4, new DateTime(2024, 11, 27, 13, 22, 9, 558, DateTimeKind.Local).AddTicks(4740), 1 }
                });

            migrationBuilder.InsertData(
                table: "ChoreUserProfile",
                columns: new[] { "ChoresId", "UserProfilesId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 3, 1 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChoreCompletions_ChoreId",
                table: "ChoreCompletions",
                column: "ChoreId");

            migrationBuilder.CreateIndex(
                name: "IX_ChoreCompletions_UserProfileId",
                table: "ChoreCompletions",
                column: "UserProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_ChoreUserProfile_UserProfilesId",
                table: "ChoreUserProfile",
                column: "UserProfilesId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChoreCompletions");

            migrationBuilder.DropTable(
                name: "ChoreUserProfile");

            migrationBuilder.DropTable(
                name: "Chores");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "0b32d8ad-bd6c-4985-8d1f-db7930321622", "AQAAAAIAAYagAAAAEM0oKUjDIH9Mku+yUi7Y3Q2Y8/3rwImg5cJlISzSAsfi6aO0xWBOoSeY9nkxRJ4ixQ==", "d4b49fa0-37ca-4e51-8cde-4c0e975f9b1c" });
        }
    }
}
