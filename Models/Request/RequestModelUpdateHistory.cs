using ftDB.BaseLibrary.Models;
using ftDB.Models.Response.WorkoutHistoryModels;

namespace ftDB.Models.Request
{
    public class RequestModelUpdateHistory(string name, int duration, DateTime date, DateTime startTime, DateTime endTime, ModelPastExercise[] exercises, int id, DateTime createdDate) : ModelWorkout<ModelPastExercise>(name, duration, date, exercises)
    {
        public int Id { get; set; } = id;
        public DateTime StartTime { get; set; } = startTime;
        public DateTime EndTime { get; set; } = endTime;
        public DateTime CreatedDate { get; set; } = createdDate;
    }
}