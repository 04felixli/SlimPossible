using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitnessTrackerBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class AddIsCustomPropertyToExercises : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "is_custom",
                table: "exercises",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "is_custom",
                table: "exercises");
        }
    }
}
