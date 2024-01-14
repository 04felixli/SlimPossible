using ftDB.Entities;
using ftDB.BaseLibrary;
using ftDB.BaseLibrary.Models;

namespace ftDB.Models.Response
{
    public class ResponseModelExerciseInList : ResponseBase
    {
        public ModelExercise[]? Exercises { get; set; }

        public ResponseModelExerciseInList() { }

        public ResponseModelExerciseInList(ModelExercise[]? exercises)
        {
            Exercises = exercises;
        }

    }
}