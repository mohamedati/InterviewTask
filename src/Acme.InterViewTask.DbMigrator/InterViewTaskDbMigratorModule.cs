using Acme.InterViewTask.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace Acme.InterViewTask.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(InterViewTaskEntityFrameworkCoreModule),
    typeof(InterViewTaskApplicationContractsModule)
)]
public class InterViewTaskDbMigratorModule : AbpModule
{
}
