using Microsoft.AspNetCore.SignalR;
using Microsoft.Net.Http.Headers;

namespace ftDB.Entities
{
    public class Exercise(string name, string equipment, string targetMuscle)
    {
        public int Id { get; set; }
        public string Name { get; set; } = name;

        public string Equipment { get; set; } = equipment;

        public string TargetMuscle { get; set; } = targetMuscle;
    }
}