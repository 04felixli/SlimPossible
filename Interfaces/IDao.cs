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
        Task<List<ModelExercise>> GetExerciseListAsync(string searchInput, string uuid);
        Task PostWorkoutAsync(RequestModelPostWorkout completedWorkout, string uuid);
        Task<List<ModelPastWorkout>> GetAllWorkoutsAsync(string uuid);
        Task<ModelPastWorkout> GetWorkoutAsync(int workoutId, string uuid);
        Task PostWorkoutTemplateAsync(RequestModelPostWorkoutTemplate workoutTemplate, string uuid);
        Task<ModelGetWorkoutTemplate> GetWorkoutTemplateAsync(int workoutTemplateId, string uuid);
        Task<List<ModelGetWorkoutTemplate>> GetAllTemplatesAsync(string uuid);
        Task<bool> DeleteWorkoutTemplateAsync(int workoutTemplateId, string uuid);
        Task<bool> DeleteWorkoutHistoryAsync(int workoutHistoryId, string uuid);
        Task AddExerciseToDbAsync(RequestModelAddExercise exerciseToAdd, string uuid);
        Task UpdateTemplateAsync(RequestModelUpdateTemplate template, string uuid);
        Task UpdateHistoryAsync(RequestModelUpdateHistory history, string uuid);
    }
}