using ftDB.Models.Response;
using System.Collections.Generic;

namespace ftDB.Interfaces
{
    public interface IRepo
    {
        List<ResponseModelExerciseInList> GetExerciseList(string searchInput);
    }
}