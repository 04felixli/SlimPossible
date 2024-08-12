using ftDB.BaseLibrary.Models;

namespace ftDB.Models.Request.PostWorkoutModels
{
    public class ModelCompletedSet(double weight, int reps, int setNumber, bool isCompleted) : ModelSet(weight, reps, setNumber)
    {
        public bool IsCompleted { get; set; } = isCompleted;
    }


}