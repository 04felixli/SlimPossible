using System.Diagnostics.CodeAnalysis;

namespace ftDB.Entities
{
    public class ExerciseInWorkout(int exerciseId, int completedWorkoutId, string notes, string weightUnit)
    {
        public int Id { get; set; }
        public int ExerciseId { get; set; } = exerciseId; // FK to Exercise
        public int CompletedWorkoutId { get; set; } = completedWorkoutId; // FK to CompletedWorkout
        public string Notes { get; set; } = notes;
        public string WeightUnit { get; set; } = weightUnit;
        public DateTime CreatedDate { get; set; }
        public CompletedWorkout CompletedWorkout { get; set; } = null!;  // Each ExerciseInWorkout belongs to one CompletedWorkout
        public Exercise Exercise { get; set; } = null!;  // Each ExerciseInWorkout is also one Exercise
        public ICollection<Set> Sets { get; set; } = []; // Each ExerciseInWorkout has many sets
    }
}