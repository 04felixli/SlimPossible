namespace ftDB.Entities
{
    public class Set(int id, int weight, int reps, int setNumber, int exerciseInWorkoutId, DateTime createdDate)
    {
        public int Id { get; set; } = id;
        public int Weight { get; set; } = weight;
        public int Reps { get; set; } = reps;
        public int SetNumber { get; set; } = setNumber;
        public int ExerciseInWorkoutId { get; set; } = exerciseInWorkoutId; // link to exercises_in_workout table
        public DateTime CreatedDate { get; set; } = createdDate;
    }
}