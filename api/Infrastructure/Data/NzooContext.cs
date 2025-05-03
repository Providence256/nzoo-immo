using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class NzooContext(DbContextOptions options) : DbContext(options)
{

    public DbSet<Ville> Villes { get; set; }
    public DbSet<Commune> Communes { get; set; }
    public DbSet<Devise> Devises { get; set; }
    public DbSet<Equipement> Equipements { get; set; }
    public DbSet<TypeHebergement> TypeHebergements { get; set; }
    public DbSet<Rule> Rules { get; set; }
    public DbSet<TauxChange> TauxChanges { get; set; }
    public DbSet<Listing> Listings { get; set; }
    public DbSet<ListingEquipement> ListingEquipements { get; set; }
    public DbSet<ListingLocation> ListingLocations { get; set; }
    public DbSet<ListingPhoto> ListingPhotos { get; set; }
    public DbSet<ListingPrice> ListingPrices { get; set; }
    public DbSet<ListingRule> ListingRules { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(NzooContext).Assembly);
    }
}
