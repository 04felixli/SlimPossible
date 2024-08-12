using ftDB.BaseLibrary;
using ftDB.Models.Request.UpdateWorkoutModels;

namespace ftDB.Models.Response
{
    public class ResponseModelUpdatedWorkout : ResponseBase
    {
        public ModelExerciseToUpdate[]? Exercises { get; set; }

        public ResponseModelUpdatedWorkout() { }
        public ResponseModelUpdatedWorkout(ModelExerciseToUpdate[]? exercises)
        {
            Exercises = exercises;
        }
    }
}