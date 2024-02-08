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

namespace ftDB.Repo
{
    public class MainRepo(IDao Dao) : IRepo
    {
        private readonly IDao _dao = Dao;

        public async Task<ResponseModelExerciseInList> GetExerciseListAsync(string searchInput)
        {
            List<ModelExercise> exercises = await _dao.GetExerciseListAsync(searchInput);

            ResponseModelExerciseInList response = new()
            {
                Exercises = [.. exercises] // Convert exercises to array
            };

            response.SetResponseSuccess();

            return response;
        }

        public async Task<ResponseBase> PostWorkoutAsync(RequestModelPostWorkout completedWorkout)
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
                                                            exercise.Sets.Where(set => set.IsCompleted).ToArray() // Only keep completed sets
                                                        )).ToArray();

            if (completedWorkout.Exercises.Length == 0)
            {
                resp.SetResponseSuccessWithMsg("No workout was posted since there were no exercises completed.");

                return resp;
            }

            await _dao.PostWorkoutAsync(completedWorkout);

            resp.SetResponseSuccess();

            return resp;
        }

        public async Task<ResponseModelGetAllWorkouts> GetAllWorkoutsAsync()
        {
            List<ModelPastWorkout> workouts = await _dao.GetAllWorkoutsAsync();

            ResponseModelGetAllWorkouts response = new([.. workouts]);

            response.SetResponseSuccess();

            return response;
        }

        public async Task<ResponseModelGetWorkout> GetWorkoutAsync(int workoutId)
        {
            ModelPastWorkout workout = await _dao.GetWorkoutAsync(workoutId);

            ResponseModelGetWorkout response = new(workout);

            response.SetResponseSuccess();

            return response;
        }

        public ResponseModelUpdatedWorkout DeleteExerciseFromWorkout(RequestModelUpdateWorkout workout, int exerciseId)
        {
            workout.Exercises = workout.Exercises.Where(exercise => exercise.Id != exerciseId).ToArray();

            ResponseModelUpdatedWorkout updatedExercises = new(workout.Exercises);

            return updatedExercises;
        }

        public ResponseModelUpdatedWorkout DeleteSetFromWorkout(RequestModelUpdateWorkout workout, int exerciseId, int setNumber)
        {
            ModelExerciseToUpdate exercise = workout.Exercises.First(exercise => exercise.Id == exerciseId);

            exercise.Sets = [.. exercise.Sets
                .Where(set => set.SetNumber != setNumber)
                .OrderBy(set => set.SetNumber)];

            for (int i = 0; i < exercise.Sets.Length; i++)
            {
                exercise.Sets[i].SetNumber = i + 1;
            }

            int index = Array.FindIndex(workout.Exercises, ex => ex.Id == exerciseId);

            workout.Exercises[index] = exercise;

            ResponseModelUpdatedWorkout updatedExercises = new(workout.Exercises);

            return updatedExercises;
        }

        public ResponseModelUpdatedWorkout AddSetToWorkout(RequestModelUpdateWorkout workout, int exerciseId)
        {
            ModelExerciseToUpdate exercise = workout.Exercises.First(exercise => exercise.Id == exerciseId);

            ModelSetToUpdate[] newSet = [new ModelSetToUpdate(-1, -1, exercise.Sets.Length + 1, false)];

            exercise.Sets = [.. exercise.Sets, .. newSet];

            int index = Array.FindIndex(workout.Exercises, ex => ex.Id == exerciseId);

            workout.Exercises[index] = exercise;

            ResponseModelUpdatedWorkout updatedExercises = new(workout.Exercises);

            return updatedExercises;
        }

        public async Task<ResponseModelUpdatedWorkout> ReplaceExerciseFromWorkoutAsync(RequestModelUpdateWorkout workout, int oldExerciseId, int newExerciseId)
        {
            ModelExerciseToUpdate newExercise = await _dao.GetNewExerciseByIdAsync(newExerciseId);

            int index = Array.FindIndex(workout.Exercises, ex => ex.Id == oldExerciseId);

            workout.Exercises[index] = newExercise;

            ResponseModelUpdatedWorkout updatedExercises = new(workout.Exercises);

            return updatedExercises;
        }

        public async Task<ResponseModelUpdatedWorkout> AddExerciseToWorkoutAsync(RequestModelUpdateWorkout workout, int exerciseId)
        {
            ModelExerciseToUpdate[] newExercise = [await _dao.GetNewExerciseByIdAsync(exerciseId)];

            workout.Exercises = [.. workout.Exercises, .. newExercise];

            ResponseModelUpdatedWorkout updatedExercises = new(workout.Exercises);

            return updatedExercises;
        }

        public async Task<ResponseBase> PostWorkoutTemplateAsync(RequestModelPostWorkoutTemplate workoutTemplate)
        {
            ResponseBase resp = new();

            workoutTemplate.Exercises = workoutTemplate.Exercises
                                                        .Where(exercise => exercise.Sets.Any(set => set.Weight >= 0 && set.Reps >= 0)) // Only keep exercises with at least one valid set in them
                                                        .Select(exercise => new ModelPostExerciseTemplate
                                                        (
                                                            exercise.Id,
                                                            exercise.Name,
                                                            exercise.Equipment,
                                                            exercise.TargetMuscle,
                                                            exercise.WeightUnit,
                                                            exercise.Notes,
                                                            exercise.Sets.Where(set => set.Weight >= 0 && set.Reps >= 0).ToArray() // Only keep valid sets
                                                        )).ToArray();

            if (workoutTemplate.Exercises.Length == 0)
            {
                resp.SetResponseSuccessWithMsg("No workout template was posted since there were no exercises.");

                return resp;
            }

            await _dao.PostWorkoutTemplateAsync(workoutTemplate);

            resp.SetResponseSuccess();

            return resp;
        }

        public async Task<ResponseModelGetWorkoutTemplate> GetWorkoutTemplateAsync(int workoutTemplateId)
        {
            ResponseModelGetWorkoutTemplate response = await _dao.GetWorkoutTemplateAsync(workoutTemplateId);

            response.SetResponseSuccess();

            return response;
        }


    }
}
