using ftDB.Entities;

namespace ftDB.Models
{
    public class ModelExercise(int Id, string Name, string Equipment, string TargetMuscle, DateTime CreatedDate) : Exercise(Id, Name, Equipment, TargetMuscle, CreatedDate)
    {

    }
}