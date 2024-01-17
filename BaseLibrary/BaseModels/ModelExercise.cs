using ftDB.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace ftDB.BaseLibrary.Models
{
    public class ModelExercise
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Equipment { get; set; } = null!;
        public string TargetMuscle { get; set; } = null!;

        public ModelExercise() { }
        public ModelExercise(int id, string name, string equipment, string targetMuscle)
        {
            Id = id;
            Name = name;
            Equipment = equipment;
            TargetMuscle = targetMuscle;
        }
    }
}