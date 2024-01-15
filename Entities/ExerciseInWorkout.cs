namespace ftDB.Entities
{
    public class ExerciseInWorkout(int id, int exerciseId, int workoutId, string notes, int weightUnit, DateTime createdDate)
    {
        public int Id { get; set; } = id;
        public int ExerciseId { get; set; } = exerciseId; // Link to all_exercises table
        public int WorkoutId { get; set; } = workoutId;
        public string Notes { get; set; } = notes;
        public int WeightUnit { get; set; } = weightUnit;
        public DateTime CreatedDate { get; set; } = createdDate;
    }
}