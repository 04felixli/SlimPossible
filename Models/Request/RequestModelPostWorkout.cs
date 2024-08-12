// Structure of the workout object sent in POST workout request

using ftDB.Models.Request.PostWorkoutModels;

namespace ftDB.Models.Request
{
    public class RequestModelPostWorkout(int duration, DateTime date, DateTime startTime, DateTime endTime, ModelCompletedExercise[] exercises, string name, double volume)
    {
        public string Name { get; set; } = name; // Cannot be null
        public int Duration { get; set; } = duration;
        public DateTime Date { get; set; } = date; // Cannot be DateTime.MinValue
        public double Volume { get; set; } = volume;
        public DateTime StartTime { get; set; } = startTime;
        public DateTime EndTime { get; set; } = endTime;
        public ModelCompletedExercise[] Exercises { get; set; } = exercises; // Can be empty but not null
    }
}