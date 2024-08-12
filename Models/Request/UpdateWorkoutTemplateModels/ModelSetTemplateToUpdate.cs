using ftDB.BaseLibrary.Models;

namespace ftDB.Models.Request.UpdateWorkoutTemplateModels
{
    public class ModelSetTemplateToUpdate(int weight, int reps, int setNumber) : ModelSet(weight, reps, setNumber)
    {
    }
}