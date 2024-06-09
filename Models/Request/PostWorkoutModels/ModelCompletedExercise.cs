using ftDB.BaseLibrary.Models;


namespace ftDB.Models.Request.PostWorkoutModels
{
    public class ModelCompletedExercise(int id, string name, string equipment, string targetMuscle, string weightUnit, string notes, int insertionNumber, ModelCompletedSet[] sets) : ModelExercise(id, name, equipment, targetMuscle)
    {
        public string WeightUnit { get; set; } = weightUnit; // Cannot be null
        public string Notes { get; set; } = notes; // Cannot be null. 
        public int InsertionNumber { get; set; } = insertionNumber;
        public ModelCompletedSet[] Sets { get; set; } = sets; // Can be empty but not null
    }


}