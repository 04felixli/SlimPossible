using ftDB.Models.Response;
using System.Collections.Generic;

namespace ftDB.Dao
{
    public interface IDao
    {
        List<ResponseModelExerciseInList> GetExerciseList(string searchInput);
    }
}