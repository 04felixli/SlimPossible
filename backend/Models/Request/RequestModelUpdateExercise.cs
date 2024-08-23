namespace ftDB.Models.Request
{
    public class RequestModelUpdateExercise(int exerciseId, string name, string equipment, string targetMuscle) : RequestModelAddExercise(name, equipment, targetMuscle)
    {
        public int ExerciseId { get; set; } = exerciseId;
    }
}