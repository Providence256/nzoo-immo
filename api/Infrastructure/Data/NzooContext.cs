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
    public DbSet<SousTypeByHebergement> SousTypeByHebergements { get; set; }
    public DbSet<SousTypeHebergement> SousTypeHebergements { get; set; }
    public DbSet<Discount> Discounts { get; set; }
    public DbSet<BathroomType> BathroomTypes { get; set; }
    public DbSet<WhoInSite> WhoInSites { get; set; }
    public DbSet<TypeHebergement> TypeHebergements { get; set; }
    public DbSet<Rule> Rules { get; set; }
    public DbSet<CancellationPolicy> CancellationPolicies { get; set; }
    public DbSet<BookingRule> BookingRules { get; set; }
    public DbSet<TauxChange> TauxChanges { get; set; }
    public DbSet<Listing> Listings { get; set; }
    public DbSet<ListingEquipement> ListingEquipements { get; set; }
    public DbSet<ListingLocation> ListingLocations { get; set; }
    public DbSet<ListingPhoto> ListingPhotos { get; set; }
    public DbSet<ListingPrice> ListingPrices { get; set; }
    public DbSet<ListingRule> ListingRules { get; set; }
    public DbSet<Booking> Bookings { get; set; }
    public DbSet<BookingAvailability> BookingAvailabilities { get; set; }
    public DbSet<HostEntity> Hosts { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);


        modelBuilder.Entity<SousTypeByHebergement>()
                    .HasKey(st => st.Id);

        modelBuilder.Entity<SousTypeByHebergement>()
                    .HasOne(x => x.TypeHebergement)
                    .WithMany(t => t.SousTypes)
                    .HasForeignKey(x => x.TypeHebergementId)
                    .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<SousTypeByHebergement>()
                    .HasOne(x => x.SousTypeHebergement)
                    .WithMany()
                    .HasForeignKey(x => x.SousTypeHebergementId)
                    .OnDelete(DeleteBehavior.Cascade);

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

        modelBuilder.Entity<Booking>().OwnsOne(b => b.Guests, a =>
        {
            a.Property(g => g.Adults).HasColumnName("Adults");
            a.Property(g => g.Children).HasColumnName("Children");
            a.Property(g => g.Babies).HasColumnName("Babies");
        });


        modelBuilder.ApplyConfigurationsFromAssembly(typeof(NzooContext).Assembly);
    }
}
