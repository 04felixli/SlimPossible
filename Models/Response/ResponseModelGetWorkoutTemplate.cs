using ftDB.Models.Response.GetWorkoutTemplateModels;

namespace ftDB.Models.Response
{
    public class ResponseModelGetWorkoutTemplate
    {
        public string? Name { get; set; }
        public ModelGetExerciseTemplate[]? Exercises { get; set; }

        public ResponseModelGetWorkoutTemplate() { }
        public ResponseModelGetWorkoutTemplate(string? name, ModelGetExerciseTemplate[]? exercises)
        {
            Name = name;
            Exercises = exercises;
        }

    }
}