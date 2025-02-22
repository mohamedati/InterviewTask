using Acme.InterViewTask.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace Acme.InterViewTask.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class InterViewTaskController : AbpControllerBase
{
    protected InterViewTaskController()
    {
        LocalizationResource = typeof(InterViewTaskResource);
    }
}
