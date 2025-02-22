using System.Threading.Tasks;

namespace Acme.InterViewTask.Data;

public interface IInterViewTaskDbSchemaMigrator
{
    Task MigrateAsync();
}
