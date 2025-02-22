using Xunit;

namespace Acme.InterViewTask.EntityFrameworkCore;

[CollectionDefinition(InterViewTaskTestConsts.CollectionDefinitionName)]
public class InterViewTaskEntityFrameworkCoreCollection : ICollectionFixture<InterViewTaskEntityFrameworkCoreFixture>
{

}
