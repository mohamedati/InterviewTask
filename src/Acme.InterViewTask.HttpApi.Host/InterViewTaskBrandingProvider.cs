using Microsoft.Extensions.Localization;
using Acme.InterViewTask.Localization;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace Acme.InterViewTask;

[Dependency(ReplaceServices = true)]
public class InterViewTaskBrandingProvider : DefaultBrandingProvider
{
    private IStringLocalizer<InterViewTaskResource> _localizer;

    public InterViewTaskBrandingProvider(IStringLocalizer<InterViewTaskResource> localizer)
    {
        _localizer = localizer;
    }

    public override string AppName => _localizer["AppName"];
}
