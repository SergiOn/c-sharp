# C#, .NET Core


## Build an app with ASPNET Core and Angular from scratch

https://www.udemy.com/course/build-an-app-with-aspnet-core-and-angular-from-scratch/

#### About

A practical example of how to build an application with ASP.NET Core WebAPI (v2.2) and Angular (v8) from start to finish

#### Project by author

https://github.com/TryCatchLearn/DatingApp

https://github.com/TryCatchLearn/DatingApp30

#### Migrations

https://github.com/TryCatchLearn/DatingApp/commit/c259f7bdac2628afd4fb7404db17e4b3c2b432ed

https://docs.microsoft.com/en-us/aspnet/core/migration/22-to-30?view=aspnetcore-3.0&tabs=visual-studio-mac

https://docs.microsoft.com/en-us/aspnet/core/migration/30-to-31?view=aspnetcore-3.0&tabs=visual-studio-mac

#### Dependencies

https://www.nuget.org/profiles/Microsoft

https://www.nuget.org/packages/Microsoft.EntityFrameworkCore

https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.Sqlite

https://www.nuget.org/packages/dotnet-ef

https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.Design/

#### Commands

```bash
ASPNETCORE_ENVIRONMENT = Development
```
```bash
dotnet run
dotnet watch run
```
```bash
dotnet tool install --global dotnet-ef
dotnet tool install --global dotnet-ef --version 3.0.0
dotnet-ef -h
dotnet-ef migrations -h
dotnet-ef migrations add InitialCreate
To undo this action, use 'ef migrations remove'
dotnet ef database update
```

```
dotnet ef database update generate the code:

The EF Core tools version '3.0.0' is older than that of the runtime '3.0.1'. Update the tools for the latest features and bug fixes.
info: Microsoft.EntityFrameworkCore.Infrastructure[10403]
      Entity Framework Core 3.0.1 initialized 'DataContext' using provider 'Microsoft.EntityFrameworkCore.Sqlite' with options: None
info: Microsoft.EntityFrameworkCore.Database.Command[20100]
      Executing DbCommand [Parameters=[], CommandType='Text', CommandTimeout='30']
      PRAGMA journal_mode = 'wal';
Executing DbCommand [Parameters=[], CommandType='Text', CommandTimeout='30']
PRAGMA journal_mode = 'wal';
Executing DbCommand [Parameters=[], CommandType='Text', CommandTimeout='30']
CREATE TABLE "__EFMigrationsHistory" (
    "MigrationId" TEXT NOT NULL CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY,
    "ProductVersion" TEXT NOT NULL
);
info: Microsoft.EntityFrameworkCore.Database.Command[20100]
      Executing DbCommand [Parameters=[], CommandType='Text', CommandTimeout='30']
      CREATE TABLE "__EFMigrationsHistory" (
          "MigrationId" TEXT NOT NULL CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY,
          "ProductVersion" TEXT NOT NULL
      );
Executing DbCommand [Parameters=[], CommandType='Text', CommandTimeout='30']
SELECT COUNT(*) FROM "sqlite_master" WHERE "name" = '__EFMigrationsHistory' AND "type" = 'table';
info: Microsoft.EntityFrameworkCore.Database.Command[20100]
      Executing DbCommand [Parameters=[], CommandType='Text', CommandTimeout='30']
      SELECT COUNT(*) FROM "sqlite_master" WHERE "name" = '__EFMigrationsHistory' AND "type" = 'table';
Executing DbCommand [Parameters=[], CommandType='Text', CommandTimeout='30']
SELECT "MigrationId", "ProductVersion"
FROM "__EFMigrationsHistory"
ORDER BY "MigrationId";
info: Microsoft.EntityFrameworkCore.Database.Command[20100]
      Executing DbCommand [Parameters=[], CommandType='Text', CommandTimeout='30']
      SELECT "MigrationId", "ProductVersion"
      FROM "__EFMigrationsHistory"
      ORDER BY "MigrationId";
info: Microsoft.EntityFrameworkCore.Migrations[20402]
      Applying migration '20191208234233_InitialCreate'.
Applying migration '20191208234233_InitialCreate'.
Executing DbCommand [Parameters=[], CommandType='Text', CommandTimeout='30']
CREATE TABLE "Values" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Values" PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NULL
);
info: Microsoft.EntityFrameworkCore.Database.Command[20100]
      Executing DbCommand [Parameters=[], CommandType='Text', CommandTimeout='30']
      CREATE TABLE "Values" (
          "Id" INTEGER NOT NULL CONSTRAINT "PK_Values" PRIMARY KEY AUTOINCREMENT,
          "Name" TEXT NULL
      );
Executing DbCommand [Parameters=[], CommandType='Text', CommandTimeout='30']
INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20191208234233_InitialCreate', '3.0.1');
info: Microsoft.EntityFrameworkCore.Database.Command[20100]
      Executing DbCommand [Parameters=[], CommandType='Text', CommandTimeout='30']
      INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
      VALUES ('20191208234233_InitialCreate', '3.0.1');
Done.
```

```bash
dotnet-ef migrations add AddedUserEntity
dotnet-ef database update
```
```bash
info: Microsoft.EntityFrameworkCore.Infrastructure[10403]
      Entity Framework Core 3.0.1 initialized 'DataContext' using provider 'Microsoft.EntityFrameworkCore.Sqlite' with options: None
info: Microsoft.EntityFrameworkCore.Database.Command[20100]
      Executing DbCommand [Parameters=[], CommandType='Text', CommandTimeout='30']
      SELECT COUNT(*) FROM "sqlite_master" WHERE "name" = '__EFMigrationsHistory' AND "type" = 'table';
Executing DbCommand [Parameters=[], CommandType='Text', CommandTimeout='30']
SELECT COUNT(*) FROM "sqlite_master" WHERE "name" = '__EFMigrationsHistory' AND "type" = 'table';
info: Microsoft.EntityFrameworkCore.Database.Command[20100]
      Executing DbCommand [Parameters=[], CommandType='Text', CommandTimeout='30']
      SELECT COUNT(*) FROM "sqlite_master" WHERE "name" = '__EFMigrationsHistory' AND "type" = 'table';
Executing DbCommand [Parameters=[], CommandType='Text', CommandTimeout='30']
SELECT COUNT(*) FROM "sqlite_master" WHERE "name" = '__EFMigrationsHistory' AND "type" = 'table';
Executing DbCommand [Parameters=[], CommandType='Text', CommandTimeout='30']
SELECT "MigrationId", "ProductVersion"
FROM "__EFMigrationsHistory"
ORDER BY "MigrationId";
info: Microsoft.EntityFrameworkCore.Database.Command[20100]
      Executing DbCommand [Parameters=[], CommandType='Text', CommandTimeout='30']
      SELECT "MigrationId", "ProductVersion"
      FROM "__EFMigrationsHistory"
      ORDER BY "MigrationId";
info: Microsoft.EntityFrameworkCore.Migrations[20402]
      Applying migration '20191211150441_AddedUserEntity'.
Applying migration '20191211150441_AddedUserEntity'.
Executing DbCommand [Parameters=[], CommandType='Text', CommandTimeout='30']
CREATE TABLE "Users" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Users" PRIMARY KEY AUTOINCREMENT,
    "Username" TEXT NULL,
    "PasswordHash" BLOB NULL,
    "PasswordSalt" BLOB NULL
);
info: Microsoft.EntityFrameworkCore.Database.Command[20100]
      Executing DbCommand [Parameters=[], CommandType='Text', CommandTimeout='30']
      CREATE TABLE "Users" (
          "Id" INTEGER NOT NULL CONSTRAINT "PK_Users" PRIMARY KEY AUTOINCREMENT,
          "Username" TEXT NULL,
          "PasswordHash" BLOB NULL,
          "PasswordSalt" BLOB NULL
      );
Executing DbCommand [Parameters=[], CommandType='Text', CommandTimeout='30']
INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20191211150441_AddedUserEntity', '3.0.1');
info: Microsoft.EntityFrameworkCore.Database.Command[20100]
      Executing DbCommand [Parameters=[], CommandType='Text', CommandTimeout='30']
      INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
      VALUES ('20191211150441_AddedUserEntity', '3.0.1');
Done.
```

#### Links

https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy

https://docs.microsoft.com/en-us/dotnet/core/versions/remove-runtime-sdk-versions?tabs=macos

https://www.nuget.org/packages

https://www.nuget.org/profiles/Microsoft

https://stackoverflow.com/questions/46958892/cant-find-edit-project-command-in-visual-studio-for-mac

https://stackoverflow.com/questions/50133774/curly-brackets-indention-in-visual-studio-for-mac

https://intellij-support.jetbrains.com/hc/en-us/community/posts/205814379-Scroll-Past-End-Of-File

https://www.tutorialsteacher.com/core/aspnet-core-environment-variable

https://blog.jetbrains.com/dotnet/2018/11/08/using-net-core-launchsettings-json-rundebug-apps-rider/

https://stackoverflow.com/questions/54255531/abolute-path-in-dotnet-watch-run-command-doesnt-work

https://github.com/aspnet/EntityFrameworkCore/issues/18977

https://stackoverflow.com/questions/59118133/facing-issue-while-installing-dotnet-ef-with-netcoreapp3-0

https://stackoverflow.com/questions/40874640/value-cannot-be-null-parameter-name-connectionstring-appsettings-json-in-start

https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md

https://www.c-sharpcorner.com/article/the-using-statement-in-C-Sharp/

