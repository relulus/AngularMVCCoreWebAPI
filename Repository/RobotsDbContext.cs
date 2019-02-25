using Microsoft.EntityFrameworkCore;
using RobotStore_Service.Models;

namespace RobotStore_Service.Repository
{
    public class RobotsDbContext : DbContext
    {
        public DbSet<Robot> Robots { get; set; }

        public RobotsDbContext (DbContextOptions<RobotsDbContext> options) : base(options) { }
    }
}
