using ftDB.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace ftDB.BaseLibrary.Models
{
    public class ModelExercise(int id, string name, string equipment, string targetMuscle)
    {
        public int Id { get; set; } = id;
        public string Name { get; set; } = name;
        public string Equipment { get; set; } = equipment;
        public string TargetMuscle { get; set; } = targetMuscle;
    }
}