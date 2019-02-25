# Angular ASP.NET Core Project

## Running the application

To run the web application proceed with the following steps:

1. Installation of Node.js 8.11 or higher

2. Installation of ASP.NET core 

3. Installation of the Angular CLI:

    "npm install -g @angular/cli"

4. Open a command prompt and "cd" into the project's "Client" folder

5. Run "npm install"

6. Run "ng build --watch" to start the Angular build process and watch for changes. 
The build process will add the output to the project's "wwwroot" folder.

7. Open a new command window in the root of the project and run the following commands:

"""
dotnet restore
dotnet build
dotnet watch run
"""

8. Visit http://localhost:4200 in the browser
