namespace ftDB.BaseLibrary.Models
{
    public class ModelSet(int weight, int reps, int setNumber)
    {
        public int Weight { get; set; } = weight;
        public int Reps { get; set; } = reps;
        public int SetNumber { get; set; } = setNumber;
    }
}