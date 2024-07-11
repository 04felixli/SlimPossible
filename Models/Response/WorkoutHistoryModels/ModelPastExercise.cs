using ftDB.BaseLibrary.Models;

namespace ftDB.Models.Response.WorkoutHistoryModels
{
    public class ModelPastExercise(int id, int exerciseInHistoryId, string name, string equipment, string targetMuscle, string weightUnit, string notes, int insertionNumber, ModelPastSet[] sets) : ModelExercise(id, name, equipment, targetMuscle)
    {
        public int ExerciseInHistoryId { get; set; } = exerciseInHistoryId;
        public string WeightUnit { get; set; } = weightUnit;
        public string Notes { get; set; } = notes;
        public int InsertionNumber { get; set; } = insertionNumber;
        public ModelPastSet[] Sets { get; set; } = sets;
    }
}