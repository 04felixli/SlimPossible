namespace ftDB.Entities
{
    public class Set(double weight, int reps, int setNumber, int exerciseInWorkoutId)
    {
        public int Id { get; set; }
        public double Weight { get; set; } = weight;
        public int Reps { get; set; } = reps;
        public int SetNumber { get; set; } = setNumber;
        public int ExerciseInWorkoutId { get; set; } = exerciseInWorkoutId; // FK to ExerciseInWorkout
        public DateTime CreatedDate { get; set; }
        public ExerciseInWorkout ExerciseInWorkout { get; set; } = null!; // Each Set
    }
}