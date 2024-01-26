using ftDB.BaseLibrary;
using ftDB.Models.Request;
using ftDB.Models.Response;
using System.Collections.Generic;

namespace ftDB.Interfaces
{
    public interface IRepo
    {
        Task<ResponseModelExerciseInList> GetExerciseListAsync(string searchInput);
        Task<ResponseBase> PostWorkoutAsync(RequestModelPostWorkout completedWorkout);
        Task<ResponseModelGetAllWorkouts> GetAllPastWorkoutsAsync();
    }
}