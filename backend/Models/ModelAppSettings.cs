namespace ftDB.AppSettings
{
    public class ModelAppSettings
    {
        private static ModelAppSettings? _instance = null;
        public string? DBConnectionString { set; get; }

        public static ModelAppSettings Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new ModelAppSettings();
                }

                return _instance;
            }
        }

        private ModelAppSettings()
        {
            DBConnectionString = null;
        }
    }
}