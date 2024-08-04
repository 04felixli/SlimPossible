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
        public async Task<ResponseModelExerciseInList> GetAllExercisesAsync([FromQuery] string uuid, [FromQuery] string searchInput = "")
        {
            ResponseModelExerciseInList response = new();

            try
            {
                response = await _repo.GetExerciseListAsync(searchInput, uuid);
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
        public async Task<ResponseBase> PostWorkoutAsync([FromBody] RequestModelPostWorkout completedWorkout, [FromQuery] string uuid)
        {
            ResponseBase response = new();

            try
            {
                response = await _repo.PostWorkoutAsync(completedWorkout, uuid);
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
        public async Task<ResponseModelGetAllWorkouts> GetAllWorkoutsAsync([FromQuery] string uuid)
        {
            ResponseModelGetAllWorkouts response = new();

            try
            {
                response = await _repo.GetAllWorkoutsAsync(uuid);
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
        public async Task<ResponseModelGetWorkout> GetWorkoutAsync([FromQuery] int workoutId, [FromQuery] string uuid)
        {
            ResponseModelGetWorkout response = new();

            try
            {
                response = await _repo.GetWorkoutAsync(workoutId, uuid);
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
        [HttpPost("PostWorkoutTemplate")]
        public async Task<ResponseBase> PostWorkoutTemplateAsync([FromBody] RequestModelPostWorkoutTemplate workoutTemplate, [FromQuery] string uuid)
        {
            ResponseBase response = new();

            try
            {
                response = await _repo.PostWorkoutTemplateAsync(workoutTemplate, uuid);
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
        [HttpGet("GetWorkoutTemplate")]
        public async Task<ResponseModelGetWorkoutTemplate> GetWorkoutTemplateAsync([FromQuery] int workoutTemplateId, [FromQuery] string uuid)
        {
            ResponseModelGetWorkoutTemplate response = new();

            try
            {
                response = await _repo.GetWorkoutTemplateAsync(workoutTemplateId, uuid);
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
        [HttpGet("GetAllWorkoutTemplates")]
        public async Task<ResponseModelGetAllWorkoutTemplates> GetAllWorkoutTemplatesAsync([FromQuery] string uuid)
        {
            ResponseModelGetAllWorkoutTemplates response = new();

            try
            {
                response = await _repo.GetAllWorkoutTemplatesAsync(uuid);
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
        [HttpDelete("DeleteWorkoutTemplate")]
        public async Task<ResponseBase> DeleteWorkoutTemplateAsync([FromQuery] int workoutTemplateId, [FromQuery] string uuid)
        {
            ResponseBase response = new();

            try
            {
                response = await _repo.DeleteWorkoutTemplateAsync(workoutTemplateId, uuid);
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
        [HttpPost("AddExercise")]
        public async Task<ResponseBase> AddExerciseAsync([FromBody] RequestModelAddExercise exerciseToAdd, [FromQuery] string uuid)
        {
            ResponseBase response = new();

            try
            {
                response = await _repo.AddExerciseAsync(exerciseToAdd, uuid);
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
        [HttpPut("UpdateTemplate")]
        public async Task<ResponseBase> UpdateTemplateAsync([FromBody] RequestModelUpdateTemplate template, [FromQuery] string uuid)
        {
            ResponseBase response = new();

            try
            {
                response = await _repo.UpdateTemplateAsync(template, uuid);
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
        [HttpPut("UpdateHistory")]
        public async Task<ResponseBase> UpdateHistoryAsync([FromBody] RequestModelUpdateHistory history, [FromQuery] string uuid)
        {
            ResponseBase response = new();

            try
            {
                response = await _repo.UpdateHistoryAsync(history, uuid);
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
        [HttpDelete("DeleteWorkoutHistory")]
        public async Task<ResponseBase> DeleteWorkoutHistoryAsync([FromQuery] int workoutHistoryId, [FromQuery] string uuid)
        {
            ResponseBase response = new();

            try
            {
                response = await _repo.DeleteWorkoutHistoryAsync(workoutHistoryId, uuid);
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