using Microsoft.AspNetCore.SignalR;
using Microsoft.Net.Http.Headers;
using NpgsqlTypes;


namespace ftDB.Entities
{
    public class Exercise(int Id, string Name, string Equipment, string TargetMuscle, DateTime CreatedDate)
    {
        public int Id { get; set; } = Id;
        public string Name { get; set; } = Name;
        public string Equipment { get; set; } = Equipment;
        public string TargetMuscle { get; set; } = TargetMuscle;
        public NpgsqlTsVector SearchVector { get; private set; } = null!;
        public DateTime CreatedDate { get; set; } = CreatedDate;
    }
}