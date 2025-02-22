using System.ComponentModel.DataAnnotations;
using Volo.Abp.Identity;
using Volo.Abp.ObjectExtending;
using Volo.Abp.Threading;

namespace Acme.InterViewTask;

public static class InterViewTaskModuleExtensionConfigurator
{
    private static readonly OneTimeRunner OneTimeRunner = new OneTimeRunner();

    public static void Configure()
    {
        OneTimeRunner.Run(() =>
        {
            ConfigureExistingProperties();
            ConfigureExtraProperties();
        });
    }

    private static void ConfigureExistingProperties()
    {
        
    }

    private static void ConfigureExtraProperties()
    {
        ObjectExtensionManager.Instance.Modules().ConfigureIdentity(identity =>
        {
            identity.ConfigureUser(user =>
            {
                user.AddOrUpdateProperty<string>(
                    "CartID",
                    options =>
                    {
                        options.Attributes.Add(new RequiredAttribute());
                     
                    }
                );
             
            });
        });

    }
}
