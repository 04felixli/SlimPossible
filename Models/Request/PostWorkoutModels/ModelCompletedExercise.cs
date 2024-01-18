using ftDB.BaseLibrary.Models;


namespace ftDB.Models.PostWorkoutModels
{
    public class ModelCompletedExercise(int id, string name, string equipment, string targetMuscle, string weightUnit, string notes, ModelCompletedSet[] sets) : ModelExercise(id, name, equipment, targetMuscle)
    {
        public string WeightUnit { get; set; } = weightUnit; // Cannot be null
        public string Notes { get; set; } = notes; // Cannot be null. 
        public ModelCompletedSet[] Sets { get; set; } = sets; // Can be empty but not null
    }


}