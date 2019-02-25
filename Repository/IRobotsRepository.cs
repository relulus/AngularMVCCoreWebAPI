using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using RobotStore_Service.Models;

namespace RobotStore_Service.Repository
{
    public interface IRobotsRepository
    {     
        Task<List<Robot>> GetRobotsAsync();
        Task<PagingResult<Robot>> GetRobotsPageAsync(int skip, int take);
        Task<Robot> GetRobotAsync(int id);
        
        Task<Robot> InsertRobotAsync(Robot robot);
        Task<bool> UpdateRobotAsync(Robot robot);
        Task<bool> DeleteRobotAsync(int id);
    }
}