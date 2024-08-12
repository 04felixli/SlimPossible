namespace ftDB.Models.Request
{
    public class RequestModelAddExercise(string name, string equipment, string targetMuscle)
    {
        public string Name { get; set; } = name;
        public string Equipment { get; set; } = equipment;
        public string TargetMuscle { get; set; } = targetMuscle;
    }
}