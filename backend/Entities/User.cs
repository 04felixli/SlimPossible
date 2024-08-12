namespace ftDB.Entities
{
    public class User(int totalWorkouts, int totalTime, double totalVolume, string uuid)
    {
        public int Id { get; set; }
        public string Uuid { get; set; } = uuid;
        public int TotalWorkouts { get; set; } = totalWorkouts;
        public int TotalTime { get; set; } = totalTime; // total time spent working out (in seconds)
        public double TotalVolume { get; set; } = totalVolume; // total volume (in lbs)
    }
}