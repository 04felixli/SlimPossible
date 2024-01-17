using ftDB.Entities;
using ftDB.Models;
using ftDB.Models.Response;
using System.Collections.Generic;
using ftDB.BaseLibrary.Models;
using System.Runtime.CompilerServices;


namespace ftDB.Interfaces
{
    public interface IDao
    {
        Task<List<ModelExercise>> GetExerciseListAsync(string searchInput);
        Task<int> PostCompletedWorkoutAsync(CompletedWorkout workoutToPost);
        Task<int> PostExerciseInWorkoutAsync(ExerciseInWorkout exerciseInWorkout);
        Task PostSetAsync(Set set);
    }
}