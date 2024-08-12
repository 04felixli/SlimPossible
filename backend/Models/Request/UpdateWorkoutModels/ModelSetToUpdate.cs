using ftDB.BaseLibrary.Models;

namespace ftDB.Models.Request.UpdateWorkoutModels
{
    public class ModelSetToUpdate(int weight, int reps, int setNumber, bool isCompleted) : ModelSet(weight, reps, setNumber)
    {
        public bool IsCompleted { get; set; } = isCompleted;
    }
}