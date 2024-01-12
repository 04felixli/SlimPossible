using ftDB.Entities;
using ftDB.Models.Response;
using System.Collections.Generic;
using System.Linq;
using ftDB.Interfaces;

namespace ftDB.Repo
{
    // public class MainRepo : IRepo
    // {
    //     public List<ResponseModelExerciseInList> GetExerciseList(string searchInput)
    //     {
    //         return [];
    //     }
    // }

    public class MainRepo(IDao Dao) : IRepo
    {
        private readonly IDao _dao = Dao;

        public List<ResponseModelExerciseInList> GetExerciseList(string searchInput)
        {
            return _dao.GetExerciseList(searchInput);
        }
    }
}