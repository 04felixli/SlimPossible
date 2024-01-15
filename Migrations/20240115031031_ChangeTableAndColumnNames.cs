using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitnessTrackerBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class ChangeTableAndColumnNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "all_exercises",
                newName: "exercises");

            migrationBuilder.RenameColumn(
                name: "workout_id",
                table: "exercises_in_workout",
                newName: "completed_workout_id");

            migrationBuilder.RenameIndex(
                name: "IX_all_exercises_SearchVector",
                table: "exercises",
                newName: "IX_exercises_SearchVector");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "exercises",
                newName: "all_exercises");

            migrationBuilder.RenameColumn(
                name: "completed_workout_id",
                table: "exercises_in_workout",
                newName: "workout_id");

            migrationBuilder.RenameIndex(
                name: "IX_exercises_SearchVector",
                table: "all_exercises",
                newName: "IX_all_exercises_SearchVector");
        }
    }
}
