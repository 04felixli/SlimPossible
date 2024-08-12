using ftDB.BaseLibrary;
using ftDB.Models.Response.WorkoutHistoryModels;

namespace ftDB.Models.Response
{
    public class ResponseModelGetWorkout : ResponseBase
    {
        public ModelPastWorkout? PastWorkout { get; set; }

        public ResponseModelGetWorkout() { }
        public ResponseModelGetWorkout(ModelPastWorkout? pastWorkout)
        {
            PastWorkout = pastWorkout;
        }
    }
}