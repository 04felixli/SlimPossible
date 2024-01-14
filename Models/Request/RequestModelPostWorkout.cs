// Structure of the workout object sent in POST workout request

using ftDB.Models.PostWorkoutModels;

namespace ftDB.Models.Request
{
    public class RequestModelPostWorkout(string name, int duration, DateTime date, ModelCompletedExercise[] exercises)
    {
        public string Name { get; set; } = name;
        public int Duration { get; set; } = duration;
        public DateTime Date { get; set; } = date;
        public ModelCompletedExercise[] Exercises { get; set; } = exercises;
    }
}