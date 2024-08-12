using ftDB.BaseLibrary.Models;

namespace ftDB.Models.Response.GetWorkoutTemplateModels
{
    public class ModelGetWorkoutTemplate(int id, string name, ModelGetExerciseTemplate[] exercises, DateTime createdDate) : ModelWorkoutTemplate<ModelGetExerciseTemplate>(id, name, exercises, createdDate)
    {

    }
}