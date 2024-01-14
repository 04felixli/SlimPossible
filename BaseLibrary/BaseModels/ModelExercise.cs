using ftDB.Entities;

namespace ftDB.BaseLibrary.Models
{
    public class ModelExercise(int Id, string Name, string Equipment, string TargetMuscle)
    {
        public int Id { get; set; } = Id;
        public string Name { get; set; } = Name;
        public string Equipment { get; set; } = Equipment;
        public string TargetMuscle { get; set; } = TargetMuscle;
    }
}