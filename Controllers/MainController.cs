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
using ftDB.Models.Request.UpdateWorkoutModels;

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
        [HttpGet("GetAllWorkouts")]
        public async Task<ResponseBase> GetAllWorkoutsAsync()
        {
            ResponseModelGetAllWorkouts response = new();

            try
            {
                response = await _repo.GetAllWorkoutsAsync();
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
        [HttpGet("GetWorkout")]
        public async Task<ResponseBase> GetWorkoutAsync([FromQuery] int workoutId)
        {
            ResponseModelGetWorkout response = new();

            try
            {
                response = await _repo.GetWorkoutAsync(workoutId);
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
        [HttpPatch("DeleteExerciseFromWorkout")]
        public ResponseModelUpdatedWorkout DeleteExerciseFromWorkout([FromBody] RequestModelUpdateWorkout workout, [FromQuery] int exerciseId)
        {
            ResponseModelUpdatedWorkout response = new();

            try
            {
                response = _repo.DeleteExerciseFromWorkout(workout, exerciseId);
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
        [HttpPatch("DeleteSetFromWorkout")]
        public ResponseModelUpdatedWorkout DeleteSetFromWorkout([FromBody] RequestModelUpdateWorkout workout, [FromQuery] int exerciseId, [FromQuery] int setNumber)
        {
            ResponseModelUpdatedWorkout response = new();

            try
            {
                response = _repo.DeleteSetFromWorkout(workout, exerciseId, setNumber);
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
        [HttpPatch("AddSetToWorkout")]
        public ResponseModelUpdatedWorkout AddSetToWorkout([FromBody] RequestModelUpdateWorkout workout, [FromQuery] int exerciseId)
        {
            ResponseModelUpdatedWorkout response = new();

            try
            {
                response = _repo.AddSetToWorkout(workout, exerciseId);
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
        [HttpPatch("ReplaceExerciseFromWorkout")]
        public async Task<ResponseModelUpdatedWorkout> ReplaceExerciseFromWorkout([FromBody] RequestModelUpdateWorkout workout, [FromQuery] int oldExerciseId, int newExerciseId)
        {
            ResponseModelUpdatedWorkout response = new();

            try
            {
                response = await _repo.ReplaceExerciseFromWorkout(workout, oldExerciseId, newExerciseId);
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