namespace ftDB.Entities
{
    public class SetTemplate(int exerciseTemplateId, int setNumber, int reps, int weight)
    {
        public int Id { get; set; }
        public int ExerciseTemplateId { get; set; } = exerciseTemplateId;
        public int SetNumber { get; set; } = setNumber;
        public int Reps { get; set; } = reps;
        public int Weight { get; set; } = weight;
        public DateTime CreatedDate { get; set; }
        public ExerciseTemplate ExerciseTemplate { get; set; } = null!;
    }
}