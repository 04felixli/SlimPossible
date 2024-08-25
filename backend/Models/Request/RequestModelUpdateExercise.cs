namespace ftDB.Models.Request
{
    public class RequestModelUpdateExercise(int exerciseId, string name, string equipment, string targetMuscle, bool isHidden) : RequestModelAddExercise(name, equipment, targetMuscle)
    {
        public int ExerciseId { get; set; } = exerciseId;
        public bool IsHidden { get; set; } = isHidden;
    }
}