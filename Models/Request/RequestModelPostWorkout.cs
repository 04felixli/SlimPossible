// Structure of the workout object sent in POST workout request

using ftDB.Models.Request.PostWorkoutModels;

namespace ftDB.Models.Request
{
    public class RequestModelPostWorkout(int duration, DateTime date, ModelCompletedExercise[] exercises, string name)
    {
        public string Name { get; set; } = name; // Cannot be null
        public int Duration { get; set; } = duration;
        public DateTime Date { get; set; } = date; // Cannot be DateTime.MinValue
        public ModelCompletedExercise[] Exercises { get; set; } = exercises; // Can be empty but not null
    }
}