using ftDB.BaseLibrary.Models;
using ftDB.Models.Response.GetWorkoutTemplateModels;

namespace ftDB.Models.Request
{
    public class RequestModelUpdateTemplate(int id, string name, ModelGetExerciseTemplate[] exercises, DateTime createdDate) : ModelWorkoutTemplate<ModelGetExerciseTemplate>(id, name, exercises, createdDate)
    {

    }
}