using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace Acme.InterViewTask.Data;

/* This is used if database provider does't define
 * IInterViewTaskDbSchemaMigrator implementation.
 */
public class NullInterViewTaskDbSchemaMigrator : IInterViewTaskDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
