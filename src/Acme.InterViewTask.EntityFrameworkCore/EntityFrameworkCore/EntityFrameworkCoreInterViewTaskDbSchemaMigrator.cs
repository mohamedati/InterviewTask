using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Acme.InterViewTask.Data;
using Volo.Abp.DependencyInjection;

namespace Acme.InterViewTask.EntityFrameworkCore;

public class EntityFrameworkCoreInterViewTaskDbSchemaMigrator
    : IInterViewTaskDbSchemaMigrator, ITransientDependency
{
    private readonly IServiceProvider _serviceProvider;

    public EntityFrameworkCoreInterViewTaskDbSchemaMigrator(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task MigrateAsync()
    {
        /* We intentionally resolving the InterViewTaskDbContext
         * from IServiceProvider (instead of directly injecting it)
         * to properly get the connection string of the current tenant in the
         * current scope.
         */

        await _serviceProvider
            .GetRequiredService<InterViewTaskDbContext>()
            .Database
            .MigrateAsync();
    }
}
