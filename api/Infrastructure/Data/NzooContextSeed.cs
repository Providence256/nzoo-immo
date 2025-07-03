using System;
using System.Text.Json;
using Core.Entities;
using Core.Entities.Identity;

namespace Infrastructure.Data;

public class NzooContextSeed
{
    public static async Task SeedAsync(NzooContext context)
    {
        if (!context.SousTypeHebergements.Any())
        {
            var sousTypesData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/sous-type.json");

            var sousTypes = JsonSerializer.Deserialize<List<SousTypeHebergement>>(sousTypesData);

            if (sousTypes != null && sousTypes.Count > 0)
            {
                foreach (var sousType in sousTypes)
                {
                    if (!context.SousTypeHebergements.Any(x => x.Id == sousType.Id))
                    {
                        context.SousTypeHebergements.AddRange(sousType);
                    }
                }
                await context.SaveChangesAsync();
            }
        }

        if (!context.BathroomTypes.Any())
        {
            var bathroomTypesData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/salledebains.json");

            var bathroomTypes = JsonSerializer.Deserialize<List<BathroomType>>(bathroomTypesData);

            if (bathroomTypes != null && bathroomTypes.Count > 0)
            {
                foreach (var bathroomType in bathroomTypes)
                {
                    if (!context.BathroomTypes.Any(x => x.Id == bathroomType.Id))
                    {
                        context.BathroomTypes.AddRange(bathroomType);
                    }
                }
                await context.SaveChangesAsync();
            }
        }

        if (!context.WhoInSites.Any())
        {
            var whoInSitesData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/whoSinSite.json");

            var whoInSites = JsonSerializer.Deserialize<List<WhoInSite>>(whoInSitesData);

            if (whoInSites != null && whoInSites.Count > 0)
            {
                foreach (var whoInSite in whoInSites)
                {
                    if (!context.WhoInSites.Any(x => x.Id == whoInSite.Id))
                    {
                        context.WhoInSites.AddRange(whoInSite);
                    }
                }
                await context.SaveChangesAsync();
            }
        }

        if (!context.Discounts.Any())
        {
            var discountsData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/reduction.json");

            var discounts = JsonSerializer.Deserialize<List<Discount>>(discountsData);

            if (discounts != null && discounts.Count > 0)
            {
                foreach (var discount in discounts)
                {
                    if (!context.Discounts.Any(x => x.Id == discount.Id))
                    {
                        context.Discounts.AddRange(discount);
                    }
                }
                await context.SaveChangesAsync();
            }
        }
    }


}
