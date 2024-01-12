using ftDB.Models.Response;
using System.Collections.Generic;

namespace ftDB.Interfaces
{
    public interface IDao
    {
        List<ResponseModelExerciseInList> GetExerciseList(string searchInput);
    }
}