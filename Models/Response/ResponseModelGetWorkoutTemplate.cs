using ftDB.BaseLibrary;
using ftDB.Models.Response.GetWorkoutTemplateModels;

namespace ftDB.Models.Response
{
    public class ResponseModelGetWorkoutTemplate : ResponseBase
    {
        public ModelGetWorkoutTemplate? WorkoutTemplate { get; set; }

        public ResponseModelGetWorkoutTemplate() { }
        public ResponseModelGetWorkoutTemplate(ModelGetWorkoutTemplate workoutTemplate)
        {
            WorkoutTemplate = workoutTemplate;
        }

    }
}