using ftDB.BaseLibrary.Models;

namespace ftDB.Models.Response.GetWorkoutTemplateModels
{
    public class ModelGetSetTemplate(int id, double weight, int reps, int setNumber, bool isCompleted) : ModelSet(weight, reps, setNumber)
    {
        public int Id { get; set; } = id;
        public bool IsCompleted { get; set; } = isCompleted;
    }
}