using System;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config;

public class CommuneConfiguration : IEntityTypeConfiguration<Commune>
{
    public void Configure(EntityTypeBuilder<Commune> builder)
    {
        builder.Property(c => c.Code)
                .IsRequired()
                .HasMaxLength(10);

        builder.Property(c => c.Designation)
            .IsRequired()
            .HasMaxLength(50);

        builder.HasOne(c => c.Ville)
            .WithMany()
            .HasForeignKey(c => c.VilleId);

        builder.HasIndex(c => c.Code)
            .IsUnique();
    }
}
