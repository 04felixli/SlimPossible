using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitnessTrackerBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class AddedUUIDToExercisesList : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "uuid",
                table: "exercises",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "uuid",
                table: "exercises");
        }
    }
}
