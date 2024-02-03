using ftDB.BaseLibrary.Models;

namespace ftDB.Models.Response.GetWorkoutTemplateModels
{
    public class ModelGetExerciseTemplate(int id, string name, string equipment, string targetMuscle, string weightUnit, string notes, ModelGetSetTemplate[] sets) : ModelExercise(id, name, equipment, targetMuscle)
    {
        public string WeightUnit { get; set; } = weightUnit;
        public string Notes { get; set; } = notes;
        public ModelGetSetTemplate[] Sets { get; set; } = sets;
    }
}