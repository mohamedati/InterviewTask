using Acme.InterViewTask.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;
using Volo.Abp.MultiTenancy;

namespace Acme.InterViewTask.Permissions;

public class InterViewTaskPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(InterViewTaskPermissions.GroupName);

        //Define your own permissions here. Example:
        //myGroup.AddPermission(InterViewTaskPermissions.MyPermission1, L("Permission:MyPermission1"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<InterViewTaskResource>(name);
    }
}
