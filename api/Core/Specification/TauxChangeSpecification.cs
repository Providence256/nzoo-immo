using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specification;

public class TauxChangeSpecification : BaseSpecification<TauxChange>
{
    public TauxChangeSpecification()
    {
        AddInclude(x => x.Devise);
        AddInclude(x => x.DeviseReference);
    }

    public TauxChangeSpecification(int id) : base(x => x.Id == id)
    {
        AddInclude(x => x.Devise);
        AddInclude(x => x.DeviseReference);
    }
}
