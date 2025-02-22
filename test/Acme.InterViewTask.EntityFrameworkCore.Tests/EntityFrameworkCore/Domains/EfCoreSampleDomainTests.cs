using Acme.InterViewTask.Samples;
using Xunit;

namespace Acme.InterViewTask.EntityFrameworkCore.Domains;

[Collection(InterViewTaskTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<InterViewTaskEntityFrameworkCoreTestModule>
{

}
