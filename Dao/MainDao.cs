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

        #region Private Methods 

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

        #endregion
    }
}