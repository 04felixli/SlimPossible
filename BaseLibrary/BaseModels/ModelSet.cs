namespace ftDB.BaseLibrary.Models
{
    public class ModelSet
    {
        public int Weight { get; set; }
        public int Reps { get; set; }
        public int SetNumber { get; set; }

        public ModelSet() { }
        public ModelSet(int weight, int reps, int setNumber)
        {
            Weight = weight;
            Reps = reps;
            SetNumber = setNumber;
        }
    }
}