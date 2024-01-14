using ftDB.BaseLibrary.Models;


namespace ftDB.Models.PostWorkoutModels
{
    public class ModelCompletedExercise(int Id, string Name, string Equipment, string TargetMuscle, string WeightUnits, string Notes, ModelCompletedSet[] sets) : ModelExercise(Id, Name, Equipment, TargetMuscle)
    {
        public string WeightUnits { get; set; } = WeightUnits;
        public string Notes { get; set; } = Notes;
        public ModelCompletedSet[] Sets = sets;


    }


}