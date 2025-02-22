using Volo.Abp.Modularity;

namespace Acme.InterViewTask;

[DependsOn(
    typeof(InterViewTaskApplicationModule),
    typeof(InterViewTaskDomainTestModule)
)]
public class InterViewTaskApplicationTestModule : AbpModule
{

}
