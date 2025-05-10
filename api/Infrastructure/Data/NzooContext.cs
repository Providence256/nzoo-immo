using Core.Entities;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class NzooContext(DbContextOptions options) : IdentityDbContext<AppUser, AppRole, int>(options)
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




        modelBuilder.Entity<TauxChange>()
                    .HasOne(e => e.Devise)
                    .WithMany()
                    .HasForeignKey(e => e.DeviseId)
                    .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<TauxChange>()
                    .HasOne(e => e.DeviseReference)
                    .WithMany()
                    .HasForeignKey(e => e.DeviseReferenceId)
                    .OnDelete(DeleteBehavior.Restrict);
        modelBuilder.Entity<ListingLocation>()
                    .HasOne(l => l.Ville)
                    .WithMany()
                    .HasForeignKey(l => l.VilleId)
                    .OnDelete(DeleteBehavior.Restrict);


        modelBuilder.ApplyConfigurationsFromAssembly(typeof(NzooContext).Assembly);
    }
}
