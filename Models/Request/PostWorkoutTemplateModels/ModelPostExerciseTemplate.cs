using ftDB.BaseLibrary.Models;

namespace ftDB.Models.Request.PostWorkoutTemplateModels
{
    public class ModelPostExerciseTemplate(int id, string name, string equipment, string targetMuscle, string weightUnit, string notes, ModelPostSetTemplate[] sets) : ModelExercise(id, name, equipment, targetMuscle)
    {
        public string WeightUnit { get; set; } = weightUnit;
        public string Notes { get; set; } = notes;
        public ModelPostSetTemplate[] Sets { get; set; } = sets;
    }
}