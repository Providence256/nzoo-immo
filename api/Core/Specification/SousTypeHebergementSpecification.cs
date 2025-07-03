using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specification;

public class SousTypeByHebergementSpecification : BaseSpecification<SousTypeByHebergement>
{
    public SousTypeByHebergementSpecification()
    {
        AddInclude(x => x.TypeHebergement!);
        AddInclude(x => x.SousTypeHebergement!);
    }

    public SousTypeByHebergementSpecification(Expression<Func<SousTypeByHebergement, bool>> criteria) : base(criteria)
    {
        AddInclude(x => x.TypeHebergement!);
        AddInclude(x => x.SousTypeHebergement!);
    }

    public SousTypeByHebergementSpecification(int typeId) : base(c => c.TypeHebergementId == typeId)
    {
        AddInclude(c => c.TypeHebergement!);

        AddInclude(x => x.SousTypeHebergement!);
    }

}
