using Volo.Abp.Modularity;

namespace Acme.InterViewTask;

[DependsOn(
    typeof(InterViewTaskDomainModule),
    typeof(InterViewTaskTestBaseModule)
)]
public class InterViewTaskDomainTestModule : AbpModule
{

}
