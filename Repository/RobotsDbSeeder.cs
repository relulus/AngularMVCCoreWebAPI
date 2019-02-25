using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using RobotStore_Service.Models;

namespace RobotStore_Service.Repository
{
    public class RobotsDbSeeder
    {
        readonly ILogger _Logger;

        public RobotsDbSeeder(ILoggerFactory loggerFactory)
        {
            _Logger = loggerFactory.CreateLogger("RobotsDbSeederLogger");
        }

        public async Task SeedAsync(IServiceProvider serviceProvider)
        {
            using (var serviceScope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var robotsDb = serviceScope.ServiceProvider.GetService<RobotsDbContext>();
                if (await robotsDb.Database.EnsureCreatedAsync())
                {
                    if (!await robotsDb.Robots.AnyAsync()) {
                      await InsertRobotsSampleData(robotsDb);
                    }
                }
            }
        }

        public async Task InsertRobotsSampleData(RobotsDbContext db)
        {           
            try
            {
                int numAffected = await db.SaveChangesAsync();
                _Logger.LogInformation(@"Saved {numAffected} states");
            }
            catch (Exception exp)
            {                
                _Logger.LogError($"Error in {nameof(RobotsDbSeeder)}: " + exp.Message);
                throw; 
            }

            var robots = GetRobots();
            db.Robots.AddRange(robots);

            try
            {
              int numAffected = await db.SaveChangesAsync();
                _Logger.LogInformation($"Saved {numAffected} robots");
            }
            catch (Exception exp)
            {
              _Logger.LogError($"Error in {nameof(RobotsDbSeeder)}: " + exp.Message);
              throw;
            }

        }

        private List<Robot> GetRobots() {
      //Robots
      var robotDetails = new string[]
      {
                "ROB1,Robot1,Description1,100",
                "ROB2,Robot2,Description2,200",
                "ROB3,Robot3,Description3,300",
                "ROB4,Robot4,Description4,400",
                "ROB5,Robot5,Description5,500",
                "ROB6,Robot6,Description6,600",
                "ROB7,Robot7,Description7,700",
                "ROB8,Robot8,Description8,800",
                "ROB9,Robot9,Description9,900",
                "ROB10,Robot10,Description10,100",
                "ROB11,Robot11,Description11,200",
                "ROB12,Robot12,Description12,300",
                "ROB13,Robot13,Description13,400",
                "ROB14,Robot14,Description14,500",
                "ROB15,Robot15,Description15,600",
                "ROB16,Robot16,Description16,700",
                "ROB17,Robot17,Description17,800",
                "ROB18,Robot18,Description18,900",
                "ROB19,Robot19,Description19,100",
                "ROB20,Robot20,Description20,200",
                "ROB21,Robot21,Description21,300",
                "ROB22,Robot22,Description22,400",
                "ROB23,Robot23,Description23,500",
                "ROB24,Robot24,Description24,600",
                "ROB25,Robot25,Description25,700",
                "ROB26,Robot26,Description26,800"
      };
                     
            var robots = new List<Robot>();

            for (var i = 0; i < robotDetails.Length; i++) {
                var robotDet = robotDetails[i].Split(',');          

                var robot = new Robot {
                    Code = robotDet[0],
                    Name = robotDet[1],
                    Description = robotDet[2],
                    Price =  Convert.ToDouble(robotDet[3])
                };
            robots.Add(robot);
          
            }

            return robots;
        }

      
    }
}
