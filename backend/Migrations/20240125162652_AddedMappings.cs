using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitnessTrackerBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class AddedMappings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_sets_exercise_in_workout_id",
                table: "sets",
                column: "exercise_in_workout_id");

            migrationBuilder.CreateIndex(
                name: "IX_exercises_in_workout_completed_workout_id",
                table: "exercises_in_workout",
                column: "completed_workout_id");

            migrationBuilder.CreateIndex(
                name: "IX_exercises_in_workout_exercise_id",
                table: "exercises_in_workout",
                column: "exercise_id");

            migrationBuilder.AddForeignKey(
                name: "FK_exercises_in_workout_completed_workouts_completed_workout_id",
                table: "exercises_in_workout",
                column: "completed_workout_id",
                principalTable: "completed_workouts",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_exercises_in_workout_exercises_exercise_id",
                table: "exercises_in_workout",
                column: "exercise_id",
                principalTable: "exercises",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_sets_exercises_in_workout_exercise_in_workout_id",
                table: "sets",
                column: "exercise_in_workout_id",
                principalTable: "exercises_in_workout",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_exercises_in_workout_completed_workouts_completed_workout_id",
                table: "exercises_in_workout");

            migrationBuilder.DropForeignKey(
                name: "FK_exercises_in_workout_exercises_exercise_id",
                table: "exercises_in_workout");

            migrationBuilder.DropForeignKey(
                name: "FK_sets_exercises_in_workout_exercise_in_workout_id",
                table: "sets");

            migrationBuilder.DropIndex(
                name: "IX_sets_exercise_in_workout_id",
                table: "sets");

            migrationBuilder.DropIndex(
                name: "IX_exercises_in_workout_completed_workout_id",
                table: "exercises_in_workout");

            migrationBuilder.DropIndex(
                name: "IX_exercises_in_workout_exercise_id",
                table: "exercises_in_workout");
        }
    }
}
