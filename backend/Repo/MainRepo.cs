using ftDB.Entities;
using ftDB.Models.Response;
using System.Collections.Generic;
using System.Linq;
using ftDB.Interfaces;
using ftDB.Models;
using ftDB.Exceptions;
using ftDB.BaseLibrary.Models;
using ftDB.BaseLibrary;
using ftDB.Models.Request;
using System.Runtime.CompilerServices;
using ftDB.Models.Request.PostWorkoutModels;
using ftDB.Models.Response.WorkoutHistoryModels;
using ftDB.Models.Request.UpdateWorkoutModels;
using ftDB.Models.Request.PostWorkoutTemplateModels;
using ftDB.Models.Response.GetWorkoutTemplateModels;
using ftDB.Models.Response.UserDataModels;
using ftDB.Models.Response.ExerciseInListModels;

namespace ftDB.Repo
{
    public class MainRepo(IDao Dao) : IRepo
    {
        private readonly IDao _dao = Dao;

        public async Task<ResponseModelExerciseInList> GetExerciseListAsync(string searchInput, string uuid, bool filterByCustom, bool filterByHidden)
        {
            List<ModelExerciseInList> exercises = await _dao.GetExerciseListAsync(searchInput, uuid, filterByCustom, filterByHidden);

            ResponseModelExerciseInList response = new()
            {
                Exercises = [.. exercises] // Convert exercises to array
            };

            response.SetResponseSuccess();

            return response;
        }

        public async Task<ResponseBase> PostWorkoutAsync(RequestModelPostWorkout completedWorkout, string uuid)
        {
            ResponseBase resp = new();

            completedWorkout.Exercises = completedWorkout.Exercises
                                                        .Where(exercise => exercise.Sets.Any(set => set.IsCompleted)) // Only keep exercises with at least one completed set
                                                        .Select(exercise => new ModelCompletedExercise
                                                        (
                                                            exercise.Id,
                                                            exercise.Name,
                                                            exercise.Equipment,
                                                            exercise.TargetMuscle,
                                                            exercise.WeightUnit,
                                                            exercise.Notes,
                                                            exercise.InsertionNumber,
                                                            exercise.Sets.Where(set => set.IsCompleted).ToArray() // Only keep completed sets
                                                        )).ToArray();

            if (completedWorkout.Exercises.Length == 0)
            {
                resp.SetResponseSuccessWithMsg("No workout was posted since there were no exercises completed.");

                return resp;
            }

            await _dao.PostWorkoutAsync(completedWorkout, uuid);
            await _dao.UpdateUserDataAsync(uuid, 1, completedWorkout.Duration, completedWorkout.Volume);
            resp.SetResponseSuccess();

            return resp;
        }

        public async Task<ResponseModelGetAllWorkouts> GetAllWorkoutsAsync(string uuid)
        {
            List<ModelPastWorkout> workouts = await _dao.GetAllWorkoutsAsync(uuid);

            ResponseModelGetAllWorkouts response = new([.. workouts]);

            response.SetResponseSuccess();

            return response;
        }

        public async Task<ResponseModelGetWorkout> GetWorkoutAsync(int workoutId, string uuid)
        {
            ModelPastWorkout workout = await _dao.GetWorkoutAsync(workoutId, uuid);

            ResponseModelGetWorkout response = new(workout);

            response.SetResponseSuccess();

            return response;
        }

        public async Task<ResponseBase> PostWorkoutTemplateAsync(RequestModelPostWorkoutTemplate workoutTemplate, string uuid)
        {
            ResponseBase resp = new();

            workoutTemplate.Exercises = workoutTemplate.Exercises
                                                        // .Where(exercise => exercise.Sets.Any(set => set.Weight >= 0 && set.Reps >= 0)) // Only keep exercises with at least one valid set in them
                                                        .Select(exercise => new ModelPostExerciseTemplate
                                                        (
                                                            exercise.Id,
                                                            exercise.Name,
                                                            exercise.Equipment,
                                                            exercise.TargetMuscle,
                                                            exercise.WeightUnit,
                                                            exercise.Notes,
                                                            exercise.InsertionNumber,
                                                            exercise.Sets
                                                        // exercise.Sets.Where(set => set.Weight >= 0 && set.Reps >= 0).ToArray() // Only keep valid sets
                                                        )).ToArray();

            if (workoutTemplate.Exercises.Length == 0)
            {
                resp.SetResponseSuccessWithMsg("No workout template was posted since there were no exercises.");

                return resp;
            }

            await _dao.PostWorkoutTemplateAsync(workoutTemplate, uuid);

            resp.SetResponseSuccess();

            return resp;
        }

        public async Task<ResponseModelGetWorkoutTemplate> GetWorkoutTemplateAsync(int workoutTemplateId, string uuid)
        {
            ModelGetWorkoutTemplate template = await _dao.GetWorkoutTemplateAsync(workoutTemplateId, uuid);
            ResponseModelGetWorkoutTemplate response = new(template);

            response.SetResponseSuccess();

            return response;
        }

        public async Task<ResponseModelGetAllWorkoutTemplates> GetAllWorkoutTemplatesAsync(string uuid)
        {
            List<ModelGetWorkoutTemplate> templates = await _dao.GetAllTemplatesAsync(uuid);

            ResponseModelGetAllWorkoutTemplates response = new([.. templates]);

            response.SetResponseSuccess();

            return response;
        }

        public async Task<ResponseBase> DeleteWorkoutTemplateAsync(int workoutTemplateId, string uuid)
        {
            ResponseBase resp = new();

            bool isDeleted = await _dao.DeleteWorkoutTemplateAsync(workoutTemplateId, uuid);

            if (isDeleted)
            {
                resp.SetResponseSuccess();

                return resp;
            }

            resp.SetResponseSuccessWithMsg("There was nothing to delete");

            return resp;
        }

        public async Task<ResponseBase> DeleteWorkoutHistoryAsync(int workoutHistoryId, string uuid)
        {
            ResponseBase resp = new();

            CompletedWorkout? deletedWorkout = await _dao.DeleteWorkoutHistoryAsync(workoutHistoryId, uuid);

            if (deletedWorkout != null)
            {
                await _dao.UpdateUserDataAsync(uuid, -1, -deletedWorkout.Duration, -deletedWorkout.Volume);
                resp.SetResponseSuccess();
                return resp;
            }

            resp.SetResponseSuccessWithMsg("There was nothing to delete");

            return resp;
        }

        public async Task<ResponseBase> AddExerciseAsync(RequestModelAddExercise exerciseToAdd, string uuid)
        {
            ResponseBase resp = new();
            await _dao.AddExerciseToDbAsync(exerciseToAdd, uuid);
            resp.SetResponseSuccess();
            return resp;
        }

        public async Task<ResponseBase> UpdateExerciseAsync(RequestModelUpdateExercise updatedExercise, string uuid)
        {
            ResponseBase resp = new();
            await _dao.UpdateExerciseInDbAsync(updatedExercise, uuid);
            resp.SetResponseSuccess();
            return resp;
        }

        public async Task<ResponseBase> UpdateTemplateAsync(RequestModelUpdateTemplate workoutTemplate, string uuid)
        {
            ResponseBase resp = new();

            workoutTemplate.Exercises = workoutTemplate.Exercises
                                                        // .Where(exercise => exercise.Sets.Any(set => set.Weight >= 0 && set.Reps >= 0)) // Only keep exercises with at least one valid set in them
                                                        .Select(exercise => new ModelGetExerciseTemplate
                                                        (
                                                            exercise.Id,
                                                            exercise.ExerciseInTemplateId,
                                                            exercise.Name,
                                                            exercise.Equipment,
                                                            exercise.TargetMuscle,
                                                            exercise.WeightUnit,
                                                            exercise.Notes,
                                                            exercise.InsertionNumber,
                                                            exercise.Sets
                                                        // exercise.Sets.Where(set => set.Weight >= 0 && set.Reps >= 0).ToArray() // Only keep valid sets
                                                        )).ToArray();

            if (workoutTemplate.Exercises.Length == 0)
            {
                resp = await DeleteWorkoutTemplateAsync(workoutTemplate.Id, uuid);
                resp.SetResponseSuccessWithMsg("Workout template was deleted since there were no exercises.");

                return resp;
            }

            await _dao.UpdateTemplateAsync(workoutTemplate, uuid);
            resp.SetResponseSuccess();
            return resp;
        }

        public async Task<ResponseBase> UpdateHistoryAsync(RequestModelUpdateHistory completedWorkout, string uuid)
        {
            ResponseBase resp = new();

            completedWorkout.Exercises = completedWorkout.Exercises
                                                        .Where(exercise => exercise.Sets.Any(set => set.IsCompleted)) // Only keep exercises with at least one completed set
                                                        .Select(exercise => new ModelPastExercise
                                                        (
                                                            exercise.Id,
                                                            exercise.ExerciseInHistoryId,
                                                            exercise.Name,
                                                            exercise.Equipment,
                                                            exercise.TargetMuscle,
                                                            exercise.WeightUnit,
                                                            exercise.Notes,
                                                            exercise.InsertionNumber,
                                                            exercise.Sets.Where(set => set.IsCompleted).ToArray() // Only keep completed sets
                                                        )).ToArray();

            if (completedWorkout.Exercises.Length == 0)
            {
                resp = await DeleteWorkoutHistoryAsync(completedWorkout.Id, uuid);
                resp.SetResponseSuccessWithMsg("Workout was deleted since there were no completed exercises");

                return resp;
            }

            await _dao.UpdateHistoryAsync(completedWorkout, uuid);
            await _dao.RecalculateUserDataAsync(uuid);
            resp.SetResponseSuccess();
            return resp;
        }

        public async Task<ResponseBase> ReorderTemplatesAsync(int[] templateIds, string uuid)
        {
            ResponseBase resp = new();

            await _dao.ReorderTemplatesAsync(templateIds, uuid);
            resp.SetResponseSuccess();
            return resp;
        }

        public async Task<ResponseModelGetUserData> GetUserDataAsync(string uuid)
        {
            User userData = await _dao.GetUserDataAsync(uuid);
            ResponseModelGetUserData resp = new();

            if (userData.TotalWorkouts != 0)
            {
                int avgWorkoutDuration = userData.TotalTime / userData.TotalWorkouts;
                double avgWorkoutVolume = userData.TotalVolume / userData.TotalWorkouts;
                ModelUserData data = new(userData.TotalWorkouts, userData.TotalTime, userData.TotalVolume, avgWorkoutDuration, avgWorkoutVolume);
                resp.Data = data;
            }
            else
            {
                resp.Data = new();
            }

            resp.SetResponseSuccess();
            return resp;
        }

    }
}
