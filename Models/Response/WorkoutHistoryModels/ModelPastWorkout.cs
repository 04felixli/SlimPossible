using ftDB.BaseLibrary.Models;

namespace ftDB.Models.Response.WorkoutHistoryModels
{
    public class ModelPastWorkout(string name, int duration, DateTime date, ModelPastExercise[] exercises, int id, DateTime createdDate) : ModelWorkout<ModelPastExercise>(name, duration, date, exercises)
    {
        public int Id { get; set; } = id;
        public DateTime CreatedDate { get; set; } = createdDate;
    }
}