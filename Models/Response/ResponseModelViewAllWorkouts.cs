using ftDB.BaseLibrary;
using ftDB.Models.Response.WorkoutHistoryModels;

namespace ftDB.Models.Response
{
    public class ResponseModelViewAllWorkouts : ResponseBase
    {
        public ModelPastWorkout[]? PastWorkouts { get; set; }

        public ResponseModelViewAllWorkouts() { }
        public ResponseModelViewAllWorkouts(ModelPastWorkout[]? pastWorkouts)
        {
            PastWorkouts = pastWorkouts;
        }
    }
}