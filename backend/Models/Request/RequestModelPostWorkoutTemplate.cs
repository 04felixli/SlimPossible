using ftDB.Models.Request.PostWorkoutTemplateModels;

namespace ftDB.Models.Request
{
    public class RequestModelPostWorkoutTemplate(string name, ModelPostExerciseTemplate[] exercises)
    {
        public string Name { get; set; } = name; // Cannot be null
        public ModelPostExerciseTemplate[] Exercises { get; set; } = exercises;
    }
}