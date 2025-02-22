using System;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Identity;
using Volo.Abp.ObjectExtending;
using Volo.Abp.Threading;

namespace Acme.InterViewTask.EntityFrameworkCore;

public static class InterViewTaskEfCoreEntityExtensionMappings
{
    private static readonly OneTimeRunner OneTimeRunner = new OneTimeRunner();

    public static void Configure()
    {
        InterViewTaskGlobalFeatureConfigurator.Configure();
        InterViewTaskModuleExtensionConfigurator.Configure();

     

        OneTimeRunner.Run(() =>
        {
            ObjectExtensionManager.Instance
                .MapEfCoreProperty<IdentityUser, Nullable< int>>(
                    "CartID",
                    (entityBuilder, propertyBuilder) => { propertyBuilder.HasMaxLength(128); propertyBuilder.IsRequired(false); }
                );

        });
    }
}
