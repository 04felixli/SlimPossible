namespace ftDB.BaseLibrary.Models
{
    public class ModelWorkoutTemplate<T>(int id, string name, T[] exercises, DateTime createdDate)
    {
        public int Id { get; set; } = id;
        public string Name { get; set; } = name;
        public T[] Exercises { get; set; } = exercises;
        public DateTime CreatedDate { get; set; } = createdDate;
    }
}