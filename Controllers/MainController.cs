using Microsoft.AspNetCore.Mvc;
using ftDB.Interfaces;
using ftDB.Entities;
using System;
using System.Collections.Generic;
using ftDB.Models.Response;
using Microsoft.AspNetCore.Cors;
using ftDB.Exceptions;
using ftDB.BaseLibrary;
using ftDB.Models.Request;

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

        [EnableCors]
        [HttpPost("PostWorkout")]
        public async Task<ResponseBase> PostWorkoutAsync([FromBody] RequestModelPostWorkout completedWorkout)
        {
            ResponseBase response = new();

            try
            {
                response = await _repo.PostWorkoutAsync(completedWorkout);
            }
            catch (CustomExceptionModel ex)
            {
                response.SetResponseFailed(ex.Message);
            }
            catch (Exception ex)
            {
                response.SetResponseFailed($"An exception occurred | Message: {ex.Message} | Inner Message: {ex.InnerException}");
            }

            return response;
        }

        [EnableCors]
        [HttpGet("ViewAllPastWorkouts")]
        public async Task<ResponseBase> GetAllPastWorkoutsAsync()
        {
            ResponseModelViewAllWorkouts response = new();

            try
            {
                response = await _repo.GetAllPastWorkoutsAsync();
            }
            catch (CustomExceptionModel ex)
            {
                response.SetResponseFailed(ex.Message);
            }
            catch (Exception ex)
            {
                response.SetResponseFailed($"An exception occurred | Message: {ex.Message} | Inner Message: {ex.InnerException}");
            }

            return response;
        }
    }
}