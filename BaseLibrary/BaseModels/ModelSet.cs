namespace ftDB.BaseLibrary.Models
{
    public class ModelSet(double weight, int reps, int setNumber)
    {
        public double Weight { get; set; } = weight;
        public int Reps { get; set; } = reps;
        public int SetNumber { get; set; } = setNumber;
    }
}