using ftDB.BaseLibrary;
using ftDB.Models.Request.UpdateWorkoutTemplateModels;

namespace ftDB.Models.Response
{
    public class ResponseModelUpdatedWorkoutTemplate : ResponseBase
    {
        public ModelExerciseTemplateToUpdate[]? Exercises { get; set; }

        public ResponseModelUpdatedWorkoutTemplate() { }
        public ResponseModelUpdatedWorkoutTemplate(ModelExerciseTemplateToUpdate[]? exercises)
        {
            Exercises = exercises;
        }
    }
}