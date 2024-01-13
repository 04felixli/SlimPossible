using ftDB.Models.Response;
using System.Collections.Generic;

namespace ftDB.Interfaces
{
    public interface IRepo
    {
        Task<ResponseModelExerciseInList> GetExerciseListAsync(string searchInput);
    }
}