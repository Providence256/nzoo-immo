using System;
using System.IO.Compression;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data;

public class ListingConfiguration : IEntityTypeConfiguration<Listing>
{
    public void Configure(EntityTypeBuilder<Listing> builder)
    {
        builder.Property(l => l.Title)
            .IsRequired()
            .HasMaxLength(100);
        builder.Property(l => l.Description)
            .IsRequired()
            .HasMaxLength(2000);
        builder.HasOne(l => l.TypeHebergement)
            .WithMany()
            .HasForeignKey(l => l.TypeHebergementId);
        builder.HasOne(l => l.Price)
            .WithOne(p => p.Listing)
            .HasForeignKey<ListingPrice>(p => p.ListingId);

        builder.HasOne(l => l.Location)
            .WithOne(loc => loc.Listing)
            .HasForeignKey<ListingLocation>(loc => loc.ListingId);

    }
}
