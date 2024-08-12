namespace ftDB.BaseLibrary.Models
{
    public class ModelWorkout<T>(string name, int duration, DateTime date, T[] exercises)
    {
        public string Name { get; set; } = name;
        public int Duration { get; set; } = duration;
        public DateTime Date { get; set; } = date;
        public T[] Exercises { get; set; } = exercises; // Can be ModelCompletedExercise[] or ModelPastExercise[], for example.
    }
}