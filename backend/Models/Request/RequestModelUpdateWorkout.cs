using ftDB.Models.Request.UpdateWorkoutModels;

namespace ftDB.Models.Request
{
    public class RequestModelUpdateWorkout(ModelExerciseToUpdate[] exercises)
    {
        public ModelExerciseToUpdate[] Exercises { get; set; } = exercises; // Can be empty but not null
    }
}