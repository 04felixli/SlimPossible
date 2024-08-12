using ftDB.BaseLibrary;
using ftDB.Entities;
using ftDB.Models.Response.UserDataModels;

namespace ftDB.Models.Response
{
    public class ResponseModelGetUserData : ResponseBase
    {
        public ModelUserData? Data { get; set; }

        public ResponseModelGetUserData() { }
        public ResponseModelGetUserData(ModelUserData data)
        {
            Data = data;
        }
    }
}