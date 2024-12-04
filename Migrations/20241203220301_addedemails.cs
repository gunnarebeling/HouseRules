using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HouseRules.Migrations
{
    /// <inheritdoc />
    public partial class addedemails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "UserProfiles",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "6156c1a8-43f7-45b0-8d1d-23d7d76beb12", "AQAAAAIAAYagAAAAELbOtWy/OMRdO/V9mF0piwzXMqZL9YUSoaSiIVXW+gTxGrv5dF2yU6nxqWRJR65Sjg==", "3ebb8b13-c69d-436a-8ca4-3d3c8dd7bef8" });

            migrationBuilder.UpdateData(
                table: "ChoreCompletions",
                keyColumn: "Id",
                keyValue: 1,
                column: "CompletedOn",
                value: new DateTime(2024, 12, 2, 16, 3, 0, 954, DateTimeKind.Local).AddTicks(4360));

            migrationBuilder.UpdateData(
                table: "ChoreCompletions",
                keyColumn: "Id",
                keyValue: 2,
                column: "CompletedOn",
                value: new DateTime(2024, 12, 3, 16, 3, 0, 954, DateTimeKind.Local).AddTicks(4400));

            migrationBuilder.UpdateData(
                table: "UserProfiles",
                keyColumn: "Id",
                keyValue: 1,
                column: "Email",
                value: "admina@strator.comx");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "UserProfiles");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "518d1b72-8754-4134-aa70-de78acfc8764", "AQAAAAIAAYagAAAAEMooVSyD26cS7dcz/2Th4yK8Xw48KiQdvNerY8ZCUPYVCor7HM1Xy9aBgopVN2R48A==", "0efb95c5-cad5-4c82-96e9-43f35706a583" });

            migrationBuilder.UpdateData(
                table: "ChoreCompletions",
                keyColumn: "Id",
                keyValue: 1,
                column: "CompletedOn",
                value: new DateTime(2024, 11, 26, 13, 22, 9, 558, DateTimeKind.Local).AddTicks(4710));

            migrationBuilder.UpdateData(
                table: "ChoreCompletions",
                keyColumn: "Id",
                keyValue: 2,
                column: "CompletedOn",
                value: new DateTime(2024, 11, 27, 13, 22, 9, 558, DateTimeKind.Local).AddTicks(4740));
        }
    }
}
