namespace ftDB.Exceptions
{
    public class CustomExceptionModel : Exception
    {
        public string Msg { get; set; }

        public CustomExceptionModel(string message) : base(message)
        {
            Msg = message;
        }

        public CustomExceptionModel(string message, Exception innerException) : base(message, innerException)
        {
            Msg = $"{message}: {innerException.Message}";
        }
    }
}

