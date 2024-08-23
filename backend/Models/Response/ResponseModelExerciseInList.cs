using ftDB.Entities;
using ftDB.BaseLibrary;
using ftDB.BaseLibrary.Models;
using ftDB.Models.Response.ExerciseInListModels;

namespace ftDB.Models.Response
{
    public class ResponseModelExerciseInList : ResponseBase
    {
        public ModelExerciseInList[]? Exercises { get; set; }

        public ResponseModelExerciseInList() { }

        public ResponseModelExerciseInList(ModelExerciseInList[]? exercises)
        {
            Exercises = exercises;
        }

    }
}