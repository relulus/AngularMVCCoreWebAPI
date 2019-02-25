using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RobotStore_Service.Models
{
    public class ApiResponse
    {
        public bool Status { get; set; }
        public Robot Robot { get; set; }
        public ModelStateDictionary ModelState { get; set; }
    }
}
