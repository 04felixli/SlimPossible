namespace ftDB.Entities
{
    public class ExerciseTemplate(int exerciseId, int workoutTemplateId, string notes, string weightUnit, int insertionNumber)
    {
        public int Id { get; set; }
        public int ExerciseId { get; set; } = exerciseId;
        public int WorkoutTemplateId { get; set; } = workoutTemplateId;
        public string Notes { get; set; } = notes;
        public string WeightUnit { get; set; } = weightUnit;
        public DateTime CreatedDate { get; set; }
        public WorkoutTemplate WorkoutTemplate { get; set; } = null!;
        public Exercise Exercise { get; set; } = null!;
        public ICollection<SetTemplate> SetTemplates { get; set; } = [];
        public int InsertionNumber { get; set; } = insertionNumber;

    }
}