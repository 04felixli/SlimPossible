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
using ftDB.Models.PostWorkoutModels;

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

            if (completedWorkout.Exercises.FirstOrDefault(exercise => exercise.Sets.Any(set => set.IsCompleted == true)) == null)
            {
                resp.SetResponseSuccess();

                return resp;
            }

            CompletedWorkout workoutToPost = new(completedWorkout.Date, completedWorkout.Duration, completedWorkout.Name); // Create new CompletedWorkout entity

            int workoutId = await _dao.PostCompletedWorkoutAsync(workoutToPost);

            foreach (ModelCompletedExercise exerciseInWorkout in completedWorkout.Exercises.Where(exercise => exercise.Sets.Any(set => set.IsCompleted == true) && exercise.Sets.Length != 0))
            {
                ExerciseInWorkout exercise = new(exerciseInWorkout.Id, workoutId, exerciseInWorkout.Notes, exerciseInWorkout.WeightUnit); // create new ExercieInWorout entity

                int exerciseInWorkoutId = await _dao.PostExerciseInWorkoutAsync(exercise);

                int completedSetCounter = 0;

                foreach (ModelCompletedSet set in exerciseInWorkout.Sets.Where(set => set.IsCompleted == true))
                {
                    set.SetNumber = completedSetCounter + 1;

                    completedSetCounter++;

                    Set setToPost = new(set.Weight, set.Reps, set.SetNumber, exerciseInWorkoutId); // Create new Set entity

                    await _dao.PostSetAsync(setToPost);
                }
            }

            resp.SetResponseSuccess();

            return resp;
        }
    }
}
