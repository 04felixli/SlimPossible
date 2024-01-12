using ftDB.Entities;
using ftDB.Models.Response;
using System.Collections.Generic;
using System.Linq;
using ftDB.Interfaces;

namespace ftDB.Dao
{
    public class MainDao(PostgressDBContext context) : IDao
    {
        private readonly PostgressDBContext _context = context;

        public List<ResponseModelExerciseInList> GetExerciseList(string searchInput)
        {
            return [];
        }
    }
}