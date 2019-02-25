FROM microsoft/dotnet:sdk

LABEL author="Relu Tataru"

ENV DOTNET_USE_POLLING_FILE_WATCHER=1
ENV ASPNETCORE_URLS=http://*:5000

EXPOSE 4200

WORKDIR /var/www/aspnetcoreapp

CMD ["/bin/bash", "-c", "dotnet restore && dotnet watch run"]
