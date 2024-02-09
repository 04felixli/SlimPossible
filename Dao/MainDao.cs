using ftDB.Entities;
using ftDB.Models.Response;
using System.Collections.Generic;
using System.Linq;
using ftDB.Interfaces;
using ftDB.Models;
using Microsoft.EntityFrameworkCore;
using ftDB.Exceptions;
using NpgsqlTypes;
using ftDB.BaseLibrary.Models;
using System.Runtime.CompilerServices;
using ftDB.Models.Request;
using ftDB.Models.Request.PostWorkoutModels;
using ftDB.Models.Response.WorkoutHistoryModels;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using ftDB.Models.Request.UpdateWorkoutModels;
using ftDB.Models.Request.PostWorkoutTemplateModels;
using ftDB.Models.Response.GetWorkoutTemplateModels;

namespace ftDB.Dao
{
    public class MainDao(PostgressDBContext context) : IDao
    {
        private readonly PostgressDBContext _context = context;

        public async Task<List<ModelExercise>> GetExerciseListAsync(string searchInput)
        {
            if (searchInput != "")
            {
                return await GetExerciseListWhenStringExistsAsync(searchInput);
            }

            return await GetExerciseListEmptyStringAsync();

        }

        public async Task PostWorkoutAsync(RequestModelPostWorkout completedWorkout)
        {
            using var transaction = _context.Database.BeginTransaction();

            try
            {
                CompletedWorkout workoutToPost = new(completedWorkout.Date, completedWorkout.Duration, completedWorkout.Name); // Create new CompletedWorkout entity

                int workoutId = await PostCompletedWorkoutAsync(workoutToPost);

                foreach (ModelCompletedExercise exerciseInWorkout in completedWorkout.Exercises)
                {
                    ExerciseInWorkout exercise = new(exerciseInWorkout.Id, workoutId, exerciseInWorkout.Notes, exerciseInWorkout.WeightUnit); // create new ExercieInWorout entity

                    int exerciseInWorkoutId = await PostExerciseInWorkoutAsync(exercise);

                    int completedSetCounter = 0;

                    foreach (ModelCompletedSet set in exerciseInWorkout.Sets)
                    {
                        set.SetNumber = completedSetCounter + 1;

                        completedSetCounter++;

                        Set setToPost = new(set.Weight, set.Reps, set.SetNumber, exerciseInWorkoutId); // Create new Set entity

                        await PostSetAsync(setToPost);
                    }
                }

                transaction.Commit();
            }
            catch (DbUpdateException ex)
            {
                transaction.Rollback();
                throw new CustomExceptionModel("There was an error updating the database inside of MainDao.PostWorkoutAsync: " + ex.Message);
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                throw new CustomExceptionModel("An exception occurred inside of MainDao.PostWorkoutAsync: " + ex.Message);
            }
        }

        public async Task<List<ModelPastWorkout>> GetAllWorkoutsAsync()
        {
            List<ModelPastWorkout> workouts = await _context.CompletedWorkouts
                .Include(cw => cw.ExercisesInWorkout)
                    .ThenInclude(eiw => eiw.Sets)
                .OrderByDescending(completedWorkouts => completedWorkouts.Id)
                .Select(completedWorkouts => new ModelPastWorkout(
                    completedWorkouts.Name,
                    completedWorkouts.Duration,
                    completedWorkouts.Date,
                    completedWorkouts.ExercisesInWorkout
                        .OrderBy(eiw => eiw.CompletedWorkoutId)
                        .Select(exerciseInWorkout => new ModelPastExercise(
                            exerciseInWorkout.Exercise.Id,
                            exerciseInWorkout.Exercise.Name,
                            exerciseInWorkout.Exercise.Equipment,
                            exerciseInWorkout.Exercise.TargetMuscle,
                            exerciseInWorkout.WeightUnit,
                            exerciseInWorkout.Notes,
                            exerciseInWorkout.Sets
                                .OrderBy(s => s.SetNumber)
                                .Select(s => new ModelPastSet(s.Weight, s.Reps, s.SetNumber))
                                .ToArray()
                        )).ToArray(),
                    completedWorkouts.Id,
                    completedWorkouts.CreatedDate
                )).ToListAsync();

            return workouts;
        }

        public async Task<ModelPastWorkout> GetWorkoutAsync(int workoutId)
        {
            ModelPastWorkout workouts = await _context.CompletedWorkouts
                .Include(cw => cw.ExercisesInWorkout)
                    .ThenInclude(eiw => eiw.Sets)
                .Where(completedWorkouts => completedWorkouts.Id == workoutId)
                .Select(completedWorkouts => new ModelPastWorkout(
                    completedWorkouts.Name,
                    completedWorkouts.Duration,
                    completedWorkouts.Date,
                    completedWorkouts.ExercisesInWorkout
                        .OrderBy(eiw => eiw.CompletedWorkoutId)
                        .Select(exerciseInWorkout => new ModelPastExercise(
                            exerciseInWorkout.Exercise.Id,
                            exerciseInWorkout.Exercise.Name,
                            exerciseInWorkout.Exercise.Equipment,
                            exerciseInWorkout.Exercise.TargetMuscle,
                            exerciseInWorkout.WeightUnit,
                            exerciseInWorkout.Notes,
                            exerciseInWorkout.Sets
                                .OrderBy(s => s.SetNumber)
                                .Select(s => new ModelPastSet(s.Weight, s.Reps, s.SetNumber))
                                .ToArray()
                        )).ToArray(),
                    completedWorkouts.Id,
                    completedWorkouts.CreatedDate
                )).FirstAsync();

            return workouts;
        }

        public async Task<ModelExerciseToUpdate> GetNewExerciseByIdAsync(int id)
        {
            ModelExerciseToUpdate? newExercise = await _context.ExercisesInWorkouts
                                               .OrderByDescending(e => e.Id)
                                               .Where(e => e.ExerciseId == id)
                                               .Include(e => e.Exercise)
                                               .Select(e => new ModelExerciseToUpdate(
                                                   e.ExerciseId,
                                                   e.Exercise.Name,
                                                   e.Exercise.Equipment,
                                                   e.Exercise.TargetMuscle,
                                                   e.WeightUnit,
                                                   "",
                                                   new ModelSetToUpdate[]
                                                   {
                                                        new(-1, -1, 1, false),
                                                   }
                                               ))
                                               .FirstOrDefaultAsync();

            newExercise ??= await _context.Exercises
                              .Where(e => e.Id == id)
                              .Select(e => new ModelExerciseToUpdate(
                                e.Id,
                                e.Name,
                                e.Equipment,
                                e.TargetMuscle,
                                "lbs",
                                "",
                                new ModelSetToUpdate[]
                                {
                                    new(-1, -1, 1, false),
                                }
                              )).FirstAsync();

            return newExercise;
        }

        public async Task PostWorkoutTemplateAsync(RequestModelPostWorkoutTemplate workoutTemplate)
        {
            using var transaction = _context.Database.BeginTransaction();

            try
            {
                WorkoutTemplate templateToPost = new(workoutTemplate.Name);

                int postedTemplateId = await PostWorkoutTemplateToDBAsync(templateToPost);

                foreach (ModelPostExerciseTemplate exerciseTemplate in workoutTemplate.Exercises)
                {
                    ExerciseTemplate exerciseToPost = new(exerciseTemplate.Id, postedTemplateId, exerciseTemplate.Notes, exerciseTemplate.WeightUnit); // create new ExercieInWorout entity

                    int postedExerciseId = await PostExerciseTemplateAsync(exerciseToPost);

                    int setCounter = 0;

                    foreach (ModelPostSetTemplate set in exerciseTemplate.Sets)
                    {
                        set.SetNumber = setCounter + 1;

                        setCounter++;

                        SetTemplate setToPost = new(set.Weight, set.Reps, set.SetNumber, postedExerciseId); // Create new Set entity

                        await PostSetTemplateAsync(setToPost);
                    }
                }

                transaction.Commit();
            }
            catch (DbUpdateException ex)
            {
                transaction.Rollback();
                throw new CustomExceptionModel("There was an error updating the database inside of MainDao.PostWorkoutTemplateAsync: " + ex.Message);
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                throw new CustomExceptionModel("An exception occurred inside of MainDao.PostWorkoutTemplateAsync: " + ex.Message);
            }
        }

        public async Task<ResponseModelGetWorkoutTemplate> GetWorkoutTemplateAsync(int workoutTemplateId)
        {
            ResponseModelGetWorkoutTemplate template = await _context.WorkoutTemplates
                .Include(wt => wt.ExerciseTemplates)
                .ThenInclude(et => et.SetTemplates)
                .Where(workoutTemplate => workoutTemplate.Id == workoutTemplateId)
                .Select(workoutTemplate => new ResponseModelGetWorkoutTemplate(
                    workoutTemplate.Name,
                    workoutTemplate.ExerciseTemplates
                                   .OrderBy(et => et.Id)
                                   .Select(exerciseTemplate => new ModelGetExerciseTemplate(
                                        exerciseTemplate.Exercise.Id,
                                        exerciseTemplate.Exercise.Name,
                                        exerciseTemplate.Exercise.Equipment,
                                        exerciseTemplate.Exercise.TargetMuscle,
                                        exerciseTemplate.WeightUnit,
                                        exerciseTemplate.Notes,
                                        exerciseTemplate.SetTemplates
                                            .OrderBy(s => s.SetNumber)
                                            .Select(s => new ModelGetSetTemplate(s.Weight, s.Reps, s.SetNumber, false))
                                            .ToArray()
                                   )).ToArray()
                )).FirstAsync();

            return template;
        }

        public async Task<List<ModelGetWorkoutTemplate>> GetAllTemplatesAsync()
        {
            List<ModelGetWorkoutTemplate> templates = await _context.WorkoutTemplates
                .Include(wt => wt.ExerciseTemplates)
                .ThenInclude(et => et.SetTemplates)
                .OrderByDescending(template => template.Id)
                .Select(template => new ModelGetWorkoutTemplate(
                    template.Id,
                    template.Name,
                    template.ExerciseTemplates
                                   .OrderBy(et => et.Id)
                                   .Select(exerciseTemplate => new ModelGetExerciseTemplate(
                                        exerciseTemplate.Exercise.Id,
                                        exerciseTemplate.Exercise.Name,
                                        exerciseTemplate.Exercise.Equipment,
                                        exerciseTemplate.Exercise.TargetMuscle,
                                        exerciseTemplate.WeightUnit,
                                        exerciseTemplate.Notes,
                                        exerciseTemplate.SetTemplates
                                            .OrderBy(s => s.SetNumber)
                                            .Select(s => new ModelGetSetTemplate(s.Weight, s.Reps, s.SetNumber, false))
                                            .ToArray()
                                   )).ToArray(),
                    template.CreatedDate
                )).ToListAsync();

            return templates;
        }

        #region Private Methods 

        private async Task<int> PostCompletedWorkoutAsync(CompletedWorkout workoutToPost)
        {
            _context.CompletedWorkouts.Add(workoutToPost);

            await _context.SaveChangesAsync();

            return workoutToPost.Id;
        }

        private async Task<int> PostExerciseInWorkoutAsync(ExerciseInWorkout exerciseInWorkout)
        {
            _context.ExercisesInWorkouts.Add(exerciseInWorkout);

            await _context.SaveChangesAsync();

            return exerciseInWorkout.Id;
        }

        private async Task PostSetAsync(Set set)
        {
            _context.Sets.Add(set);

            await _context.SaveChangesAsync();
        }

        private async Task<List<ModelExercise>> GetExerciseListWhenStringExistsAsync(string searchInput)
        {
            List<ModelExercise> exerciseList = await _context.Exercises
                                                            .Where(exercise => exercise.SearchVector.Matches(searchInput))
                                                            .OrderBy(exercise => exercise.Id)
                                                            .Select(exercise => new ModelExercise
                                                                    (
                                                                        exercise.Id,
                                                                        exercise.Name,
                                                                        exercise.Equipment,
                                                                        exercise.TargetMuscle
                                                                    )
                                                                    )
                                                            .ToListAsync();

            return exerciseList;
        }

        private async Task<List<ModelExercise>> GetExerciseListEmptyStringAsync()
        {
            List<ModelExercise> exerciseList = await _context.Exercises
                                                            .OrderBy(exercise => exercise.Id)
                                                            .Select(exercise => new ModelExercise
                                                                    (
                                                                        exercise.Id,
                                                                        exercise.Name,
                                                                        exercise.Equipment,
                                                                        exercise.TargetMuscle
                                                                    )
                                                                    )
                                                            .ToListAsync();

            return exerciseList;
        }

        private async Task<int> PostWorkoutTemplateToDBAsync(WorkoutTemplate template)
        {
            _context.WorkoutTemplates.Add(template);

            await _context.SaveChangesAsync();

            return template.Id;
        }

        private async Task<int> PostExerciseTemplateAsync(ExerciseTemplate exercise)
        {
            _context.ExerciseTemplates.Add(exercise);

            await _context.SaveChangesAsync();

            return exercise.Id;
        }

        private async Task<int> PostSetTemplateAsync(SetTemplate set)
        {
            _context.SetTemplates.Add(set);

            await _context.SaveChangesAsync();

            return set.Id;
        }

        #endregion
    }
}