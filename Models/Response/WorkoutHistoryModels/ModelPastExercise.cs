using ftDB.BaseLibrary.Models;

namespace ftDB.Models.Response.WorkoutHistoryModels
{
    public class ModelPastExercise(int id, string name, string equipment, string targetMuscle, string weightUnit, string notes, ModelPastSet[] sets) : ModelExercise(id, name, equipment, targetMuscle)
    {
        public string WeightUnit { get; set; } = weightUnit;
        public string Notes { get; set; } = notes;
        public ModelPastSet[] Sets { get; set; } = sets;
    }
}