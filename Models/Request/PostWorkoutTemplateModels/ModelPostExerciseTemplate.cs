using ftDB.BaseLibrary.Models;

namespace ftDB.Models.Request.PostWorkoutTemplateModels
{
    public class ModelPostExerciseTemplate(int id, string name, string equipment, string targetMuscle, string weightUnit, string notes, int insertionNumber, ModelPostSetTemplate[] sets) : ModelExercise(id, name, equipment, targetMuscle)
    {
        public string WeightUnit { get; set; } = weightUnit;
        public string Notes { get; set; } = notes;
        public int InsertionNumber { get; set; } = insertionNumber; // Uniquely identifies the position of an exercise in a list
        public ModelPostSetTemplate[] Sets { get; set; } = sets;
    }
}