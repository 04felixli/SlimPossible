using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitnessTrackerBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class RemoveIsCustomPropertyToExercises : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "is_custom",
                table: "exercises");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "is_custom",
                table: "exercises",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
