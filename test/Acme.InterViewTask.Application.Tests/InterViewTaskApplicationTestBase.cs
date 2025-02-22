using Volo.Abp.Modularity;

namespace Acme.InterViewTask;

public abstract class InterViewTaskApplicationTestBase<TStartupModule> : InterViewTaskTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
