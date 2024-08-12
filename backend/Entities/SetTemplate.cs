namespace ftDB.Entities
{
    public class SetTemplate(double weight, int reps, int setNumber, int exerciseTemplateId)
    {
        public int Id { get; set; }
        public int ExerciseTemplateId { get; set; } = exerciseTemplateId;
        public int SetNumber { get; set; } = setNumber;
        public int Reps { get; set; } = reps;
        public double Weight { get; set; } = weight;
        public DateTime CreatedDate { get; set; }
        public ExerciseTemplate ExerciseTemplate { get; set; } = null!;
    }
}