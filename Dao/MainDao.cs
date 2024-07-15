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
                CompletedWorkout workoutToPost = new(completedWorkout.Date, completedWorkout.StartTime, completedWorkout.EndTime, completedWorkout.Duration, completedWorkout.Name); // Create new CompletedWorkout entity

                int workoutId = await PostCompletedWorkoutAsync(workoutToPost);

                foreach (ModelCompletedExercise exerciseInWorkout in completedWorkout.Exercises)
                {
                    ExerciseInWorkout exercise = new(exerciseInWorkout.Id, workoutId, exerciseInWorkout.Notes, exerciseInWorkout.WeightUnit, exerciseInWorkout.InsertionNumber); // create new ExercieInWorout entity

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
                    completedWorkouts.StartTime,
                    completedWorkouts.EndTime,
                    completedWorkouts.ExercisesInWorkout
                        .OrderBy(eiw => eiw.CompletedWorkoutId)
                        .ThenBy(eiw => eiw.Id)
                        .Select(exerciseInWorkout => new ModelPastExercise(
                            exerciseInWorkout.Exercise.Id,
                            exerciseInWorkout.Id,
                            exerciseInWorkout.Exercise.Name,
                            exerciseInWorkout.Exercise.Equipment,
                            exerciseInWorkout.Exercise.TargetMuscle,
                            exerciseInWorkout.WeightUnit,
                            exerciseInWorkout.Notes,
                            exerciseInWorkout.InsertionNumber,
                            exerciseInWorkout.Sets
                                .OrderBy(s => s.SetNumber)
                                .Select(s => new ModelPastSet(s.Id, s.Weight, s.Reps, s.SetNumber, true))
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
                    completedWorkouts.StartTime,
                    completedWorkouts.EndTime,
                    completedWorkouts.ExercisesInWorkout
                        .OrderBy(eiw => eiw.CompletedWorkoutId)
                        .ThenBy(eiw => eiw.Id)
                        .Select(exerciseInWorkout => new ModelPastExercise(
                            exerciseInWorkout.Exercise.Id,
                            exerciseInWorkout.Id,
                            exerciseInWorkout.Exercise.Name,
                            exerciseInWorkout.Exercise.Equipment,
                            exerciseInWorkout.Exercise.TargetMuscle,
                            exerciseInWorkout.WeightUnit,
                            exerciseInWorkout.Notes,
                            exerciseInWorkout.InsertionNumber,
                            exerciseInWorkout.Sets
                                .OrderBy(s => s.SetNumber)
                                .Select(s => new ModelPastSet(s.Id, s.Weight, s.Reps, s.SetNumber, true))
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
                    ExerciseTemplate exerciseToPost = new(exerciseTemplate.Id, postedTemplateId, exerciseTemplate.Notes, exerciseTemplate.WeightUnit, exerciseTemplate.InsertionNumber); // create new ExercieInWorout entity

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

        public async Task<ModelGetWorkoutTemplate> GetWorkoutTemplateAsync(int workoutTemplateId)
        {
            ModelGetWorkoutTemplate template = await _context.WorkoutTemplates
                .Include(wt => wt.ExerciseTemplates)
                .ThenInclude(et => et.SetTemplates)
                .Where(workoutTemplate => workoutTemplate.Id == workoutTemplateId)
                .Select(workoutTemplate => new ModelGetWorkoutTemplate(
                    workoutTemplate.Id,
                    workoutTemplate.Name,
                    workoutTemplate.ExerciseTemplates
                                   .OrderBy(et => et.Id) // This already orders duplicate exercises in a template properly 
                                                         // since the earlier exercise will have a lower id value in the 
                                                         // exercise_templates table
                                   .Select(exerciseTemplate => new ModelGetExerciseTemplate(
                                        exerciseTemplate.Exercise.Id,
                                        exerciseTemplate.Id,
                                        exerciseTemplate.Exercise.Name,
                                        exerciseTemplate.Exercise.Equipment,
                                        exerciseTemplate.Exercise.TargetMuscle,
                                        exerciseTemplate.WeightUnit,
                                        exerciseTemplate.Notes,
                                        exerciseTemplate.InsertionNumber,
                                        exerciseTemplate.SetTemplates
                                            .OrderBy(s => s.SetNumber)
                                            .Select(s => new ModelGetSetTemplate(s.Id, s.Weight, s.Reps, s.SetNumber, false))
                                            .ToArray()
                                   )).ToArray(),
                    workoutTemplate.CreatedDate
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
                                        exerciseTemplate.Id,
                                        exerciseTemplate.Exercise.Name,
                                        exerciseTemplate.Exercise.Equipment,
                                        exerciseTemplate.Exercise.TargetMuscle,
                                        exerciseTemplate.WeightUnit,
                                        exerciseTemplate.Notes,
                                        exerciseTemplate.InsertionNumber,
                                        exerciseTemplate.SetTemplates
                                            .OrderBy(s => s.SetNumber)
                                            .Select(s => new ModelGetSetTemplate(s.Id, s.Weight, s.Reps, s.SetNumber, false))
                                            .ToArray()
                                   )).ToArray(),
                    template.CreatedDate
                )).ToListAsync();

            return templates;
        }

        public async Task<bool> DeleteWorkoutTemplateAsync(int workoutTemplateId)
        {
            WorkoutTemplate? templateToDelete = await _context.WorkoutTemplates.FindAsync(workoutTemplateId);

            if (templateToDelete != null)
            {
                // Remove the entity from the DbSet
                _context.WorkoutTemplates.Remove(templateToDelete);

                // Save changes to the database
                await _context.SaveChangesAsync();

                return true;
            }

            return false;
        }

        public async Task<bool> DeleteWorkoutHistoryAsync(int workoutHistoryId)
        {
            CompletedWorkout? historyToDelete = await _context.CompletedWorkouts.FindAsync(workoutHistoryId);

            if (historyToDelete != null)
            {
                // Remove the entity from the DbSet
                _context.CompletedWorkouts.Remove(historyToDelete);

                // Save changes to the database
                await _context.SaveChangesAsync();

                return true;
            }

            return false;
        }

        public async Task AddExerciseToDbAsync(RequestModelAddExercise exerciseToAdd)
        {
            Exercise exercise = new(exerciseToAdd.Name, exerciseToAdd.Equipment, exerciseToAdd.TargetMuscle);

            _context.Exercises.Add(exercise);

            await _context.SaveChangesAsync();

            return;
        }

        public async Task UpdateTemplateAsync(RequestModelUpdateTemplate modifiedTemplate)
        {
            using var transaction = _context.Database.BeginTransaction();

            try
            {
                // Fetch the old template with all of its exercises and sets
                WorkoutTemplate? oldTemplate = await _context.WorkoutTemplates
                                .Include(wt => wt.ExerciseTemplates)
                                .ThenInclude(et => et.SetTemplates)
                                .FirstOrDefaultAsync(workoutTemplate => workoutTemplate.Id == modifiedTemplate.Id);

                if (oldTemplate == null)
                {
                    return;
                }

                // Remove exercises that are no longer present
                List<int> exerciseTemplateIds = modifiedTemplate.Exercises.Select(et => et.ExerciseInTemplateId).ToList();
                List<ExerciseTemplate> exercisesToRemove = oldTemplate.ExerciseTemplates.Where(et => !exerciseTemplateIds.Contains(et.Id)).ToList();
                foreach (ExerciseTemplate exerciseTemplate in exercisesToRemove)
                {
                    oldTemplate.ExerciseTemplates.Remove(exerciseTemplate);
                }

                // await _context.SaveChangesAsync();

                // Update the template properties
                oldTemplate.Name = modifiedTemplate.Name;

                // Update the exercise templates
                foreach (ModelGetExerciseTemplate? modifiedExercise in modifiedTemplate.Exercises)
                {
                    // Get the existing exercise if it is already in the template
                    ExerciseTemplate? existingExercise = oldTemplate.ExerciseTemplates
                                                        .FirstOrDefault(et => et.Id == modifiedExercise.ExerciseInTemplateId);

                    if (existingExercise != null)
                    {
                        // Update existing exercise notes and weight unit
                        existingExercise.Notes = modifiedExercise.Notes;
                        existingExercise.WeightUnit = modifiedExercise.WeightUnit;

                        // Remove sets that are no longer present
                        List<int> setIds = modifiedExercise.Sets.Select(st => st.Id).ToList();
                        List<SetTemplate> setsToRemove = existingExercise.SetTemplates
                                                        .Where(st => !setIds.Contains(st.Id))
                                                        .ToList();
                        foreach (SetTemplate set in setsToRemove)
                        {
                            existingExercise.SetTemplates.Remove(set);
                        }

                        // Update the sets
                        foreach (ModelGetSetTemplate modifiedSet in modifiedExercise.Sets)
                        {
                            SetTemplate? existingSet = existingExercise.SetTemplates
                                                        .FirstOrDefault(st => st.Id == modifiedSet.Id);

                            if (existingSet != null)
                            {
                                // Update existing set reps and weight
                                existingSet.Reps = modifiedSet.Reps;
                                existingSet.Weight = modifiedSet.Weight;
                            }
                            else
                            {
                                // Add new set
                                existingExercise.SetTemplates.Add(new SetTemplate
                                    (modifiedSet.Weight,
                                    modifiedSet.Reps,
                                    modifiedSet.SetNumber,
                                    existingExercise.Id)
                                );
                            }
                        }
                        await _context.SaveChangesAsync();
                    }
                    else
                    {
                        // Add new exercise
                        ExerciseTemplate newExercise = new(
                            modifiedExercise.Id,
                            modifiedTemplate.Id,
                            modifiedExercise.Notes,
                            modifiedExercise.WeightUnit,
                            modifiedExercise.InsertionNumber
                        );

                        int newExerciseId = await PostExerciseTemplateAsync(newExercise);

                        // Post sets for new exercise
                        foreach (ModelGetSetTemplate set in modifiedExercise.Sets)
                        {
                            SetTemplate setToPost = new(set.Weight, set.Reps, set.SetNumber, newExerciseId); // Create new Set entity

                            await PostSetTemplateAsync(setToPost);
                        }
                    }
                }
                transaction.Commit();
            }
            catch (DbUpdateException ex)
            {
                transaction.Rollback();
                throw new CustomExceptionModel("There was an error updating the database inside of MainDao.UpdateTemplateAsync: " + ex.Message);
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                throw new CustomExceptionModel("An exception occurred inside of MainDao.UpdateTemplateAsync: " + ex.Message);
            }
        }

        public async Task UpdateHistoryAsync(RequestModelUpdateHistory completedWorkout)
        {
            using var transaction = _context.Database.BeginTransaction();

            try
            {
                // Fetch the old template with all of its exercises and sets
                CompletedWorkout? oldWorkout = await _context.CompletedWorkouts
                                .Include(wt => wt.ExercisesInWorkout)
                                .ThenInclude(et => et.Sets)
                                .FirstOrDefaultAsync(workout => workout.Id == completedWorkout.Id);

                if (oldWorkout == null)
                {
                    return;
                }

                // Remove exercises that are no longer present
                List<int> exerciseInWorkoutIds = completedWorkout.Exercises.Select(et => et.ExerciseInHistoryId).ToList();
                List<ExerciseInWorkout> exercisesToRemove = oldWorkout.ExercisesInWorkout.Where(et => !exerciseInWorkoutIds.Contains(et.Id)).ToList();
                foreach (ExerciseInWorkout exercise in exercisesToRemove)
                {
                    oldWorkout.ExercisesInWorkout.Remove(exercise);
                }

                // await _context.SaveChangesAsync();

                // Update the template properties
                oldWorkout.Name = completedWorkout.Name;

                // Update the exercise templates
                foreach (ModelPastExercise modifiedExercise in completedWorkout.Exercises)
                {
                    // Get the existing exercise if it is already in the template
                    ExerciseInWorkout? existingExercise = oldWorkout.ExercisesInWorkout
                                                        .FirstOrDefault(et => et.Id == modifiedExercise.ExerciseInHistoryId);

                    if (existingExercise != null)
                    {
                        // Update existing exercise notes and weight unit
                        existingExercise.Notes = modifiedExercise.Notes;
                        existingExercise.WeightUnit = modifiedExercise.WeightUnit;

                        // Remove sets that are no longer present
                        List<int> setIds = modifiedExercise.Sets.Select(st => st.Id).ToList();
                        List<Set> setsToRemove = existingExercise.Sets
                                                        .Where(st => !setIds.Contains(st.Id))
                                                        .ToList();
                        foreach (Set set in setsToRemove)
                        {
                            existingExercise.Sets.Remove(set);
                        }

                        // await _context.SaveChangesAsync();

                        // Update the sets
                        foreach (ModelPastSet modifiedSet in modifiedExercise.Sets)
                        {
                            Set? existingSet = existingExercise.Sets
                                                                .FirstOrDefault(st => st.Id == modifiedSet.Id);

                            if (existingSet != null)
                            {
                                // Update existing set reps and weight
                                existingSet.Reps = modifiedSet.Reps;
                                existingSet.Weight = modifiedSet.Weight;
                            }
                            else
                            {
                                // Add new set
                                existingExercise.Sets.Add(new Set
                                    (modifiedSet.Weight,
                                    modifiedSet.Reps,
                                    modifiedSet.SetNumber,
                                    existingExercise.Id)
                                );
                            }
                        }

                        await _context.SaveChangesAsync();
                    }
                    else
                    {
                        // Add new exercise
                        ExerciseInWorkout newExercise = new(
                            modifiedExercise.Id,
                            completedWorkout.Id,
                            modifiedExercise.Notes,
                            modifiedExercise.WeightUnit,
                            modifiedExercise.InsertionNumber
                        );

                        int newExerciseId = await PostExerciseInWorkoutAsync(newExercise);

                        // Post sets for new exercise
                        foreach (ModelPastSet set in modifiedExercise.Sets)
                        {
                            Set setToPost = new(set.Weight, set.Reps, set.SetNumber, newExerciseId); // Create new Set entity

                            await PostSetAsync(setToPost);
                        }
                    }
                }
                transaction.Commit();
            }
            catch (DbUpdateException ex)
            {
                transaction.Rollback();
                throw new CustomExceptionModel("There was an error updating the database inside of MainDao.UpdateHistoryAsync: " + ex.Message);
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                throw new CustomExceptionModel("An exception occurred inside of MainDao.UpdateHistoryAsync: " + ex.Message);
            }
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