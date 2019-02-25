using RobotStore_Service.Infrastructure;
using RobotStore_Service.Models;
using RobotStore_Service.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;

using System.Threading.Tasks;

namespace RobotStore_Service.Apis
{
    [Route("api/robots")]
    //[Authorize]
  public class RobotsApiController : Controller
    {
        IRobotsRepository _RobotsRepository;
        ILogger _Logger;


        public RobotsApiController(IRobotsRepository robotsRepo, ILoggerFactory loggerFactory) {
            _RobotsRepository = robotsRepo;
            _Logger = loggerFactory.CreateLogger(nameof(RobotsApiController));
        }

   

    // GET api/robots
    [HttpGet]
        [NoCache]
        [ProducesResponseType(typeof(List<Robot>), 200)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> Robots()
        {
            try
            {
                var robots = await _RobotsRepository.GetRobotsAsync();
                return Ok(robots);
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

        // GET api/robots/page/10/10
        [HttpGet("page/{skip}/{take}")]
        [NoCache]
        [ProducesResponseType(typeof(List<Robot>), 200)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> RobotsPage(int skip, int take)
        {
            try
            {
                var pagingResult = await _RobotsRepository.GetRobotsPageAsync(skip, take);
                Response.Headers.Add("X-InlineCount", pagingResult.TotalRecords.ToString());
                return Ok(pagingResult.Records);
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

        // GET api/robots/5
        [HttpGet("{id}", Name = "GetRobotRoute")]
        [NoCache]
        [ProducesResponseType(typeof(Robot), 200)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> Robots(int id)
        {
            try
            {
                var robots = await _RobotsRepository.GetRobotAsync(id);
                return Ok(robots);
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

        // POST api/robots
        [HttpPost]
        [ValidateAntiForgeryToken]
        [ProducesResponseType(typeof(ApiResponse), 201)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> CreateRobot([FromBody]Robot robots)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse { Status = false, ModelState = ModelState });
            }

            try
            {
                var newRobot = await _RobotsRepository.InsertRobotAsync(robots);
                if (newRobot == null)
                {
                    return BadRequest(new ApiResponse { Status = false });
                }
                return CreatedAtRoute("GetRobotRoute", new { id = newRobot.Id },
                        new ApiResponse { Status = true, Robot = newRobot });
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

        // PUT api/robots/5
        [HttpPut("{id}")]
        [ValidateAntiForgeryToken]
        [ProducesResponseType(typeof(ApiResponse), 200)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> UpdateRobot(int id, [FromBody]Robot robots)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse { Status = false, ModelState = ModelState });
            }

            try
            {
                var status = await _RobotsRepository.UpdateRobotAsync(robots);
                if (!status)
                {
                    return BadRequest(new ApiResponse { Status = false });
                }
                return Ok(new ApiResponse { Status = true, Robot = robots });
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

        // DELETE api/robots/5
        [HttpDelete("{id}")]
        [ValidateAntiForgeryToken]
        [ProducesResponseType(typeof(ApiResponse), 200)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> DeleteRobot(int id)
        {
            try
            {
                var status = await _RobotsRepository.DeleteRobotAsync(id);
                if (!status)
                {
                    return BadRequest(new ApiResponse { Status = false });
                }
                return Ok(new ApiResponse { Status = true });
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

    }
}
