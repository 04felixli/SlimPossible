using System.Data;

namespace ftDB.Entities
{
    public class CompletedWorkout(DateTime date, DateTime startTime, DateTime endTime, int duration, string name)
    {
        public int Id { get; set; }
        public int Duration { get; set; } = duration;
        public string Name { get; set; } = name;
        public DateTime Date { get; set; } = date;
        public DateTime StartTime { get; set; } = startTime;
        public DateTime EndTime { get; set; } = endTime;
        public DateTime CreatedDate { get; set; }
        public ICollection<ExerciseInWorkout> ExercisesInWorkout { get; set; } = []; // Each workout has many exercises
    }
}