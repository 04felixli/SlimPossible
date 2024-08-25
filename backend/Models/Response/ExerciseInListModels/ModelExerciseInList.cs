using ftDB.BaseLibrary.Models;


namespace ftDB.Models.Response.ExerciseInListModels
{
    public class ModelExerciseInList(int id, string name, string equipment, string targetMuscle, bool isCustom, bool isHidden) : ModelExercise(id, name, equipment, targetMuscle)
    {
        public bool IsCustom { get; set; } = isCustom;
        public bool IsHidden { get; set; } = isHidden;
    }


}