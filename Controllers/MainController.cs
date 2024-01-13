using Microsoft.AspNetCore.Mvc;
using ftDB.Interfaces;
using ftDB.Entities;
using System;
using System.Collections.Generic;
using ftDB.Models.Response;
using Microsoft.AspNetCore.Cors;
using ftDB.Exceptions;

namespace ftDB.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MainController(IRepo repo) : ControllerBase
    {
        private readonly IRepo _repo = repo;

        [EnableCors]
        [HttpGet("GetExerciseList")]
        public async Task<ResponseModelExerciseInList> GetAllExercisesAsync([FromQuery] string searchInput = "")
        {
            ResponseModelExerciseInList response = new();

            try
            {
                response = await _repo.GetExerciseListAsync(searchInput);
            }
            catch (CustomExceptionModel ex)
            {
                response.SetResponseFailed(ex.Message);
            }
            catch (Exception ex)
            {
                response.SetResponseFailed($"An exception occured in GetExerciseList inside of MainController.cs: {ex.Message}");
            }

            return response;
        }
    }
}