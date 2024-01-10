using ftDB.Entities;

namespace ftDB.Models.Response
{
    // When creating a ResponseModelExerciseInList object, we pass in parameters which call the Exercise object constructor
    public class ResponseModelExerciseInList(string name, string equipment, string targetMuscle) : Exercise(name, equipment, targetMuscle) { }
}