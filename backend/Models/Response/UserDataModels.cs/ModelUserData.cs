using ftDB.BaseLibrary.Models;

namespace ftDB.Models.Response.UserDataModels
{
    public class ModelUserData(int totalWorkouts = 0, int totalTime = 0, double totalVolume = 0, int avgWorkoutDuration = 0, double avgWorkoutVolume = 0)
    {
        public int TotalWorkouts { get; set; } = totalWorkouts;
        public int TotalTime { get; set; } = totalTime;
        public double TotalVolume { get; set; } = totalVolume;
        public int AvgWorkoutDuration { get; set; } = avgWorkoutDuration;
        public double AvgWorkoutVolume { get; set; } = avgWorkoutVolume;
    }
}