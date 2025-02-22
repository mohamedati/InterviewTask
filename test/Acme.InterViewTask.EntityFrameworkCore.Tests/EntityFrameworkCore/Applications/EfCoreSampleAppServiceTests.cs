using Acme.InterViewTask.Samples;
using Xunit;

namespace Acme.InterViewTask.EntityFrameworkCore.Applications;

[Collection(InterViewTaskTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<InterViewTaskEntityFrameworkCoreTestModule>
{

}
