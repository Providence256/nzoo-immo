using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specification;

public class CommuneSpecification : BaseSpecification<Commune>
{
    public CommuneSpecification()
    {
        AddInclude(x => x.Ville);
    }

    public CommuneSpecification(int id) : base(x => x.Id == id)
    {
        AddInclude(x => x.Ville);
    }
}
