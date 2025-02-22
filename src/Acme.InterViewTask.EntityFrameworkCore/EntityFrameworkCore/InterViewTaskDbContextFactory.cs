using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Acme.InterViewTask.EntityFrameworkCore;

/* This class is needed for EF Core console commands
 * (like Add-Migration and Update-Database commands) */
public class InterViewTaskDbContextFactory : IDesignTimeDbContextFactory<InterViewTaskDbContext>
{
    public InterViewTaskDbContext CreateDbContext(string[] args)
    {
        var configuration = BuildConfiguration();
        
        InterViewTaskEfCoreEntityExtensionMappings.Configure();

        var builder = new DbContextOptionsBuilder<InterViewTaskDbContext>()
            .UseSqlServer(configuration.GetConnectionString("Default"));
        
        return new InterViewTaskDbContext(builder.Options);
    }

    private static IConfigurationRoot BuildConfiguration()
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../Acme.InterViewTask.DbMigrator/"))
            .AddJsonFile("appsettings.json", optional: false);

        return builder.Build();
    }
}
