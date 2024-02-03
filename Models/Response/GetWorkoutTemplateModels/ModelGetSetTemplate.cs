using ftDB.BaseLibrary.Models;

namespace ftDB.Models.Response.GetWorkoutTemplateModels
{
    public class ModelGetSetTemplate(int weight, int reps, int setNumber, bool isCompleted) : ModelSet(weight, reps, setNumber)
    {
        public bool IsCompleted { get; set; } = isCompleted;
    }
}