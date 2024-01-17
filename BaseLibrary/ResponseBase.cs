using System.ComponentModel.DataAnnotations;

namespace ftDB.BaseLibrary
{
    public class ResponseBase
    {
        public bool Success { set; get; }
        public string? Msg { get; set; }

        public ResponseBase()
        {
        }

        public ResponseBase(bool success, string msg)
        {
            Success = success;
            Msg = msg;
        }

        public void SetResponseSuccess()
        {
            Success = true;
            Msg = "Response Successful";
        }

        public void SetResponseFailed(string message)
        {
            Success = false;
            Msg = message; // Set error msg
        }

    }
}