using ftDB.BaseLibrary;
using ftDB.Models.Request;
using ftDB.Models.Response;
using System.Collections.Generic;

namespace ftDB.Interfaces
{
    public interface IRepo
    {
        Task<ResponseModelExerciseInList> GetExerciseListAsync(string searchInput, string uuid);
        Task<ResponseBase> PostWorkoutAsync(RequestModelPostWorkout completedWorkout, string uuid);
        Task<ResponseModelGetAllWorkouts> GetAllWorkoutsAsync(string uuid);
        Task<ResponseModelGetWorkout> GetWorkoutAsync(int workoutId, string uuid);
        Task<ResponseBase> PostWorkoutTemplateAsync(RequestModelPostWorkoutTemplate workoutTemplate, string uuid);
        Task<ResponseModelGetWorkoutTemplate> GetWorkoutTemplateAsync(int workoutTemplateId, string uuid);
        Task<ResponseModelGetAllWorkoutTemplates> GetAllWorkoutTemplatesAsync(string uuid);
        Task<ResponseBase> DeleteWorkoutTemplateAsync(int workoutTemplateId, string uuid);
        Task<ResponseBase> AddExerciseAsync(RequestModelAddExercise exerciseToAdd, string uuid);
        Task<ResponseBase> UpdateTemplateAsync(RequestModelUpdateTemplate workoutTemplate, string uuid);
        Task<ResponseBase> UpdateHistoryAsync(RequestModelUpdateHistory history, string uuid);
        Task<ResponseBase> DeleteWorkoutHistoryAsync(int workoutHistoryId, string uuid);
        Task<ResponseBase> ReorderTemplatesAsync(int[] templateIds, string uuid);

    }
}