using ftDB.Entities;
using ftDB.Models;
using ftDB.Models.Response;
using System.Collections.Generic;
using ftDB.BaseLibrary.Models;
using System.Runtime.CompilerServices;
using ftDB.Models.Request;
using ftDB.Models.Response.WorkoutHistoryModels;
using ftDB.Models.Request.UpdateWorkoutModels;
using ftDB.Models.Response.GetWorkoutTemplateModels;


namespace ftDB.Interfaces
{
    public interface IDao
    {
        Task<List<ModelExercise>> GetExerciseListAsync(string searchInput);
        Task PostWorkoutAsync(RequestModelPostWorkout completedWorkout);
        Task<List<ModelPastWorkout>> GetAllWorkoutsAsync();
        Task<ModelPastWorkout> GetWorkoutAsync(int workoutId);
        Task<ModelExerciseToUpdate> GetNewExerciseByIdAsync(int exerciseId);
        Task PostWorkoutTemplateAsync(RequestModelPostWorkoutTemplate workoutTemplate);
        Task<ModelGetWorkoutTemplate> GetWorkoutTemplateAsync(int workoutTemplateId);
        Task<List<ModelGetWorkoutTemplate>> GetAllTemplatesAsync();
        Task<bool> DeleteWorkoutTemplateAsync(int workoutTemplateId);
        Task AddExerciseToDbAsync(RequestModelAddExercise exerciseToAdd);
    }
}