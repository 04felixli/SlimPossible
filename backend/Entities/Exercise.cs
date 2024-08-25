using Microsoft.AspNetCore.SignalR;
using Microsoft.Net.Http.Headers;
using NpgsqlTypes;


namespace ftDB.Entities
{
    public class Exercise(string Name, string Equipment, string TargetMuscle, string[]? hiddenForUuids, string? uuid, bool? isHidden)
    {
        public int Id { get; set; }
        public string? Uuid { get; set; } = uuid; // uuid is nullable since default exercises belong to all users
        public string Name { get; set; } = Name;
        public string[]? HiddenForUuids { get; set; } = hiddenForUuids; // array of uuids who have hidden this exercise - null for custom exercises
        public bool? IsHidden { get; set; } = isHidden; // null for default exercises
        public string Equipment { get; set; } = Equipment;
        public string TargetMuscle { get; set; } = TargetMuscle;
        public NpgsqlTsVector SearchVector { get; private set; } = null!;
        public DateTime CreatedDate { get; set; }
        public ICollection<ExerciseInWorkout> ExerciseInWorkout { get; set; } = []; // Each exercise can be done by many ExercisesInWorkouts
        public ICollection<ExerciseTemplate> ExerciseTemplate { get; set; } = [];
    }
}