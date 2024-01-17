namespace ftDB.Entities
{
    public class ExerciseInWorkout(int exerciseId, int workoutId, string notes, string weightUnit)
    {
        public int Id { get; set; }
        public int ExerciseId { get; set; } = exerciseId; // Link to all_exercises table
        public int WorkoutId { get; set; } = workoutId;
        public string Notes { get; set; } = notes;
        public string WeightUnit { get; set; } = weightUnit;
        public DateTime CreatedDate { get; set; }
    }
}