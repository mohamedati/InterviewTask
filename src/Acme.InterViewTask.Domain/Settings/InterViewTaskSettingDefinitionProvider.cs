using Volo.Abp.Settings;

namespace Acme.InterViewTask.Settings;

public class InterViewTaskSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(InterViewTaskSettings.MySetting1));
    }
}
