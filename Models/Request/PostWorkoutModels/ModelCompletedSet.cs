using ftDB.BaseLibrary.Models;

namespace ftDB.Models.PostWorkoutModels
{
    public class ModelCompletedSet : ModelSet
    {
        public bool IsCompleted { get; set; }

        public ModelCompletedSet() : base() { }

        public ModelCompletedSet(int weight, int reps, int setNumber, bool isCompleted) : base(weight, reps, setNumber)
        {
            IsCompleted = isCompleted;
        }
    }


}