using ftDB.BaseLibrary.Models;

namespace ftDB.Models.Response.WorkoutHistoryModels
{
    public class ModelPastSet(int id, int weight, int reps, int setNumber, bool isCompleted) : ModelSet(weight, reps, setNumber)
    {
        public int Id { get; set; } = id;
        public bool IsCompleted { get; set; } = isCompleted;
    }
}