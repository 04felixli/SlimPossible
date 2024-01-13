using ftDB.Entities;
using ftDB.Models.Response;
using System.Collections.Generic;
using System.Linq;
using ftDB.Interfaces;
using ftDB.Models;
using Microsoft.EntityFrameworkCore;
using ftDB.Exceptions;

namespace ftDB.Dao
{
    public class MainDao(PostgressDBContext context) : IDao
    {
        private readonly PostgressDBContext _context = context;

        public async Task<List<ModelExercise>> GetExerciseList(string searchInput)
        {
            var result = await _context.All_Exercises
                .Where(exercise => exercise.Name == "Bench Press")
                .Select(exercise => new ModelExercise
                        (
                            exercise.Id,
                            exercise.Name,
                            exercise.Equipment,
                            exercise.TargetMuscle,
                            exercise.CreatedDate
                        )
                        )
                .ToListAsync();

            return result;
        }
    }
}