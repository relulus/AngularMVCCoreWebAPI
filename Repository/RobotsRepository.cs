using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using RobotStore_Service.Models;

namespace RobotStore_Service.Repository
{
    public class RobotsRepository : IRobotsRepository
    {

        private readonly RobotsDbContext _Context;
        private readonly ILogger _Logger;

        public RobotsRepository(RobotsDbContext context, ILoggerFactory loggerFactory) {
          _Context = context;
          _Logger = loggerFactory.CreateLogger("RobotsRepository");
        }

        public async Task<List<Robot>> GetRobotsAsync()
        {
            return await _Context.Robots.OrderBy(c => c.Name).ToListAsync();
        }

        public async Task<PagingResult<Robot>> GetRobotsPageAsync(int skip, int take)
        {
            var totalRecords = await _Context.Robots.CountAsync();
            var robots = await _Context.Robots
                                 .OrderBy(c => c.Name)           
                                 .Skip(skip)
                                 .Take(take)
                                 .ToListAsync();
            return new PagingResult<Robot>(robots, totalRecords);
        }

        public async Task<Robot> GetRobotAsync(int id)
        {
            return await _Context.Robots
                                 .SingleOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Robot> InsertRobotAsync(Robot robot)
        {
            _Context.Add(robot);
            try
            {
              await _Context.SaveChangesAsync();
            }
            catch (System.Exception exp)
            {
               _Logger.LogError($"Error in {nameof(InsertRobotAsync)}: " + exp.Message);
            }

            return robot;
        }

        public async Task<bool> UpdateRobotAsync(Robot robot)
        {
            //Will update all properties of the Robot
            _Context.Robots.Attach(robot);
            _Context.Entry(robot).State = EntityState.Modified;
            try
            {
              return (await _Context.SaveChangesAsync() > 0 ? true : false);
            }
            catch (Exception exp)
            {
               _Logger.LogError($"Error in {nameof(UpdateRobotAsync)}: " + exp.Message);
            }
            return false;
        }

        public async Task<bool> DeleteRobotAsync(int id)
        {
            //Extra hop to the database but keeps it nice and simple for this demo
            //Including orders since there's a foreign-key constraint and we need
            //to remove the orders in addition to the robot
            var robot = await _Context.Robots
                                .SingleOrDefaultAsync(c => c.Id == id);
            _Context.Remove(robot);
            try
            {
              return (await _Context.SaveChangesAsync() > 0 ? true : false);
            }
            catch (System.Exception exp)
            {
               _Logger.LogError($"Error in {nameof(DeleteRobotAsync)}: " + exp.Message);
            }
            return false;
        }

    }
}
