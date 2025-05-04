using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specification;

public class ListingSpecification : BaseSpecification<Listing>
{
    public ListingSpecification()
    {
        AddInclude(x => x.TypeHebergement!);
        AddInclude(x => x.Price!);
        AddInclude("Price.Devise");

        AddInclude(x => x.Location!);
        AddInclude("Location.Ville");
        AddInclude("Location.Commune");


        AddInclude(x => x.Photos);
        AddInclude("Equipements.Equipement");
        AddInclude("Rules.Rule");
    }

    public ListingSpecification(int id) : base(x => x.Id == id)
    {
        AddInclude(x => x.TypeHebergement!);
        AddInclude(x => x.Price!);
        AddInclude("Price.Devise");

        AddInclude(x => x.Location!);
        AddInclude("Location.Ville");
        AddInclude("Location.Commune");

        AddInclude(x => x.Photos);
        AddInclude("Equipements.Equipement");
        AddInclude("Rules.Rule");
    }

}
