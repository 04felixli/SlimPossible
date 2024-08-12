namespace ftDB.Entities
{
    public class WorkoutTemplate(string name, string uuid)
    {
        public int Id { get; set; }
        public string Uuid { get; set; } = uuid;
        public string Name { get; set; } = name;
        public DateTime CreatedDate { get; set; }
        public ICollection<ExerciseTemplate> ExerciseTemplates { get; set; } = [];
    }
}