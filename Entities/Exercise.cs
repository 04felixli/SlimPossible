using Microsoft.AspNetCore.SignalR;
using Microsoft.Net.Http.Headers;
using NpgsqlTypes;


namespace ftDB.Entities
{
    public class Exercise(string Name, string Equipment, string TargetMuscle, string? uuid)
    {
        public int Id { get; set; }
        public string? Uuid { get; set; } = uuid; // uuid is nullable since default exercises belong to all users
        public string Name { get; set; } = Name;
        public string Equipment { get; set; } = Equipment;
        public string TargetMuscle { get; set; } = TargetMuscle;
        public NpgsqlTsVector SearchVector { get; private set; } = null!;
        public DateTime CreatedDate { get; set; }
        public ICollection<ExerciseInWorkout> ExerciseInWorkout { get; set; } = []; // Each exercise can be done by many ExercisesInWorkouts
        public ICollection<ExerciseTemplate> ExerciseTemplate { get; set; } = [];
    }
}