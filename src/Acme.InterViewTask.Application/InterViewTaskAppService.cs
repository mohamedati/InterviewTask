using Acme.InterViewTask.Localization;
using Volo.Abp.Application.Services;

namespace Acme.InterViewTask;

/* Inherit your application services from this class.
 */
public abstract class InterViewTaskAppService : ApplicationService
{
    protected InterViewTaskAppService()
    {
        LocalizationResource = typeof(InterViewTaskResource);
    }
}
