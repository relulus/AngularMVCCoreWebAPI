using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerUI;
using RobotStore_Service.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace RobotStore_Service
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
      //Add PostgreSQL support
      //services.AddDbContext<RobotsDbContext>(options => {
      //    options.UseNpgsql(Configuration.GetConnectionString("RobotsPostgresConnectionString"));
      //});

      //Add SQL Server support
      services.AddDbContext<RobotsDbContext>(options =>
      {
        options.UseSqlServer(Configuration.GetConnectionString("RobotsSqlServerConnectionString"));
      });


      services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
      options.TokenValidationParameters = new TokenValidationParameters
      {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,

        ValidIssuer = "http://localhost:5000",
        ValidAudience = "http://localhost:5000",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"))
      };
    });

      services.AddMvc(options =>
            {
                // Global way to add anti-forgery to dangerous requests: POST, PUT, PATCH and DELETE
                // options.Filters.Add(new AutoValidateAntiforgeryTokenAttribute());
            });

            services.AddScoped<IRobotsRepository, RobotsRepository>();
            services.AddTransient<RobotsDbSeeder>();

            // Handle XSRF Name for Header
            services.AddAntiforgery(options => {
                options.HeaderName = "X-XSRF-TOKEN";
            });

      services.AddSwaggerGen(options =>
      {
        options.SwaggerDoc("v1", new Info
        {
          Version = "v1",
          Title = "Robo Store API",
          Description = "Robo Store Description"
        });
        

        // Add XML comment document by uncommenting the following
        // var filePath = Path.Combine(PlatformServices.Default.Application.ApplicationBasePath, "MyApi.xml");
        // options.IncludeXmlComments(filePath);

      });

      services.AddCors(o => o.AddPolicy("AllowAllPolicy", options =>
            {
                options.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
            }));

            services.AddCors(o => o.AddPolicy("AllowSpecific", options => 
                    options.WithOrigins("http://localhost:4200")
                           .WithMethods("GET", "POST", "PUT", "PATCH", "DELETE")
                           .WithHeaders("accept", "content-type", "origin", "X-Inline-Count")));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, 
            RobotsDbSeeder robotsDbSeeder, IAntiforgery antiforgery)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }


      app.UseAuthentication();
      // Manually handle setting XSRF cookie. Needed because HttpOnly 
      // has to be set to false so that
      // Angular is able to read/access the cookie.
      app.Use((context, next) =>
            {
                string path = context.Request.Path.Value;
                if (path != null && !path.ToLower().Contains("/api"))
                {
                    var tokens = antiforgery.GetAndStoreTokens(context);
                    context.Response.Cookies.Append("XSRF-TOKEN", 
                        tokens.RequestToken, 
                        new CookieOptions { 
                            HttpOnly = false
                        }
                    );
                }

                return next();
            });

            // This would need to be locked down as needed (very open right now)
            app.UseCors("AllowAllPolicy");

            app.UseStaticFiles();

            // Enable middleware to serve generated Swagger as a JSON endpoint
            app.UseSwagger();

            // Enable middleware to serve swagger-ui assets (HTML, JS, CSS etc.)
            // Visit http://localhost:5000/swagger
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Robots API");
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute("spa-fallback", new { controller = "Home", action = "Index" });
            });

            robotsDbSeeder.SeedAsync(app.ApplicationServices).Wait();
        }
    }
}
