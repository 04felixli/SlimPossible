using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace FitnessTrackerBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class AddWorkoutTemplates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "workout_templates",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    created_date = table.Column<DateTime>(type: "timestamp", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_workout_templates", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "exercise_templates",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    exercise_id = table.Column<int>(type: "integer", nullable: false),
                    workout_template_id = table.Column<int>(type: "integer", nullable: false),
                    notes = table.Column<string>(type: "text", nullable: false),
                    weight_unit = table.Column<string>(type: "text", nullable: false),
                    created_date = table.Column<DateTime>(type: "timestamp", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_exercise_templates", x => x.id);
                    table.ForeignKey(
                        name: "FK_exercise_templates_exercises_exercise_id",
                        column: x => x.exercise_id,
                        principalTable: "exercises",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_exercise_templates_workout_templates_workout_template_id",
                        column: x => x.workout_template_id,
                        principalTable: "workout_templates",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "set_templates",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    exercise_template_id = table.Column<int>(type: "integer", nullable: false),
                    set_number = table.Column<int>(type: "integer", nullable: false),
                    reps = table.Column<int>(type: "integer", nullable: false),
                    weight = table.Column<int>(type: "integer", nullable: false),
                    created_date = table.Column<DateTime>(type: "timestamp", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_set_templates", x => x.id);
                    table.ForeignKey(
                        name: "FK_set_templates_exercise_templates_exercise_template_id",
                        column: x => x.exercise_template_id,
                        principalTable: "exercise_templates",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_exercise_templates_exercise_id",
                table: "exercise_templates",
                column: "exercise_id");

            migrationBuilder.CreateIndex(
                name: "IX_exercise_templates_workout_template_id",
                table: "exercise_templates",
                column: "workout_template_id");

            migrationBuilder.CreateIndex(
                name: "IX_set_templates_exercise_template_id",
                table: "set_templates",
                column: "exercise_template_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "set_templates");

            migrationBuilder.DropTable(
                name: "exercise_templates");

            migrationBuilder.DropTable(
                name: "workout_templates");
        }
    }
}
