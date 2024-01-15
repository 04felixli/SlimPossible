using System.Data;

namespace ftDB.Entities
{
    public class CompletedWorkout(int id, DateTime date, DateTime createdDate, int duration, string name)
    {
        public int Id { get; set; } = id;
        public int Duration { get; set; } = duration;
        public string Name { get; set; } = name;
        public DateTime Date { get; set; } = date;
        public DateTime CreatedDate { get; set; } = createdDate;
    }
}