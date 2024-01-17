// Structure of the workout object sent in POST workout request

using ftDB.Models.PostWorkoutModels;

namespace ftDB.Models.Request
{
    public class RequestModelPostWorkout
    {
        public string Name { get; set; } = null!;
        public int Duration { get; set; }
        public DateTime Date { get; set; }
        public ModelCompletedExercise[] Exercises { get; set; } = null!;

        public RequestModelPostWorkout() { }
        public RequestModelPostWorkout(int duration, DateTime date, ModelCompletedExercise[] exercises, string name)
        {
            Name = name;
            Duration = duration;
            Date = date;
            Exercises = exercises;
        }
    }
}