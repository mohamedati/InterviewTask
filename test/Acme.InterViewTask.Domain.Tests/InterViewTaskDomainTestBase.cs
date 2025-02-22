using Volo.Abp.Modularity;

namespace Acme.InterViewTask;

/* Inherit from this class for your domain layer tests. */
public abstract class InterViewTaskDomainTestBase<TStartupModule> : InterViewTaskTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
