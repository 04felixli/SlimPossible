using ftDB.BaseLibrary.Models;

namespace ftDB.Models.PostWorkoutModels
{
    public class ModelCompletedSet(int weight, int reps, int setNumber, bool isCompleted) : ModelSet(weight, reps, setNumber)
    {
        public bool IsCompleted { get; set; } = isCompleted;
    }


}