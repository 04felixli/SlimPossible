using ftDB.BaseLibrary.Models;


namespace ftDB.Models.PostWorkoutModels
{
    public class ModelCompletedExercise : ModelExercise
    {
        public string WeightUnit { get; set; } = null!;
        public string Notes { get; set; } = null!;
        public ModelCompletedSet[] Sets { get; set; } = null!;

        public ModelCompletedExercise() : base() { }
        public ModelCompletedExercise(int id, string name, string equipment, string targetMuscle, string weightUnit, string notes, ModelCompletedSet[] sets)
        : base(id, name, equipment, targetMuscle)
        {
            WeightUnit = weightUnit;
            Notes = notes;
            Sets = sets;
        }

    }


}