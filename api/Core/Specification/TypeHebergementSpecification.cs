using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specification;

public class TypeHebergementSpecification : BaseSpecification<TypeHebergement>
{

    public TypeHebergementSpecification()
    {
        AddInclude(x => x.SousTypes);
        AddInclude("SousTypes.SousTypeHebergement");
    }

    public TypeHebergementSpecification(Expression<Func<TypeHebergement, bool>> criteria) : base(criteria)
    {
        AddInclude(x => x.SousTypes);
        AddInclude("SousTypes.SousTypeHebergement");
    }
}
