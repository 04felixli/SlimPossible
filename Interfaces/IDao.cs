using ftDB.Entities;
using ftDB.Models;
using ftDB.Models.Response;
using System.Collections.Generic;
using ftDB.BaseLibrary.Models;


namespace ftDB.Interfaces
{
    public interface IDao
    {
        Task<List<ModelExercise>> GetExerciseListAsync(string searchInput);
    }
}