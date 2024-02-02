namespace ftDB.Entities
{
    public class WorkoutTemplate(string name)
    {
        public int Id { get; set; }
        public string Name { get; set; } = name;
        public DateTime CreatedDate { get; set; }
        public ICollection<ExerciseTemplate> ExerciseTemplates { get; set; } = [];
    }
}