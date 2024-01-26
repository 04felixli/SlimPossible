using ftDB.BaseLibrary;
using ftDB.Models.Response.WorkoutHistoryModels;

namespace ftDB.Models.Response
{
    public class ResponseModelGetAllWorkouts : ResponseBase
    {
        public ModelPastWorkout[]? PastWorkouts { get; set; }

        public ResponseModelGetAllWorkouts() { }
        public ResponseModelGetAllWorkouts(ModelPastWorkout[]? pastWorkouts)
        {
            PastWorkouts = pastWorkouts;
        }
    }
}