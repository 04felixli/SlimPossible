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
        Task<ResponseModelGetAllWorkouts> GetAllWorkoutsAsync();
        Task<ResponseModelGetWorkout> GetWorkoutAsync(int workoutId);
        ResponseModelUpdatedWorkout DeleteExerciseFromWorkout(RequestModelUpdateWorkout workout, int exerciseId);
        ResponseModelUpdatedWorkout DeleteSetFromWorkout(RequestModelUpdateWorkout workout, int exerciseId, int setNumber);
        ResponseModelUpdatedWorkout AddSetToWorkout(RequestModelUpdateWorkout workout, int exerciseId);
        Task<ResponseModelUpdatedWorkout> ReplaceExerciseFromWorkoutAsync(RequestModelUpdateWorkout workout, int oldExerciseId, int newExerciseId);
        Task<ResponseModelUpdatedWorkout> AddExerciseToWorkoutAsync(RequestModelUpdateWorkout workout, int exerciseId);
        Task<ResponseBase> PostWorkoutTemplateAsync(RequestModelPostWorkoutTemplate workoutTemplate);
        Task<ResponseModelGetWorkoutTemplate> GetWorkoutTemplateAsync(int workoutTemplateId);
        Task<ResponseModelGetAllWorkoutTemplates> GetAllWorkoutTemplatesAsync();
        Task<ResponseBase> DeleteWorkoutTemplateAsync(int workoutTemplateId);
        Task<ResponseBase> AddExerciseAsync(RequestModelAddExercise exerciseToAdd);
    }
}