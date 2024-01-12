using Microsoft.AspNetCore.Mvc;
using ftDB.Interfaces;
using ftDB.Entities;
using System;
using System.Collections.Generic;
using ftDB.Models.Response;

namespace ftDB.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    // public class MainController : ControllerBase
    // {

    //     [HttpGet("GetExerciseList")]
    //     public List<ResponseModelExerciseInList> GetAllExercises([FromQuery] string searchInput)
    //     {
    //         return [];
    //     }

    // }

    public class MainController(IRepo repo) : ControllerBase
    {
        private readonly IRepo _repo = repo;

        [HttpGet("GetExerciseList")]
        public List<ResponseModelExerciseInList> GetAllExercises([FromQuery] string searchInput)
        {
            return _repo.GetExerciseList(searchInput);
        }

    }
}