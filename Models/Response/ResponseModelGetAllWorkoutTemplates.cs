using ftDB.BaseLibrary;
using ftDB.Models.Response.GetWorkoutTemplateModels;

namespace ftDB.Models.Response
{
    public class ResponseModelGetAllWorkoutTemplates : ResponseBase
    {
        public ModelGetWorkoutTemplate[]? WorkoutTemplates { get; set; }

        public ResponseModelGetAllWorkoutTemplates() { }
        public ResponseModelGetAllWorkoutTemplates(ModelGetWorkoutTemplate[]? workoutTemplates)
        {
            WorkoutTemplates = workoutTemplates;
        }
    }
}