using ftDB.Models.Request.UpdateWorkoutTemplateModels;

namespace ftDB.Models.Request
{
    public class RequestModelUpdateWorkoutTemplate(ModelExerciseTemplateToUpdate[] exercises)
    {
        public ModelExerciseTemplateToUpdate[] Exercises { get; set; } = exercises; // Can be empty but not null
    }
}