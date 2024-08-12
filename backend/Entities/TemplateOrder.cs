namespace ftDB.Entities
{
    public class TemplateOrder(string uuid, int[] templateIds)
    {
        public int Id { get; set; }
        public string Uuid { get; set; } = uuid;
        public int[] TemplateIds { get; set; } = templateIds;
    }
}