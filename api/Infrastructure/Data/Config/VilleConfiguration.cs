using System;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config;

public class VilleConfiguration : IEntityTypeConfiguration<Ville>
{
    public void Configure(EntityTypeBuilder<Ville> builder)
    {
        builder.Property(v => v.Code)
            .IsRequired()
            .HasMaxLength(10);

        builder.Property(v => v.Designation)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(v => v.Description)
            .IsRequired()
            .HasMaxLength(1000);

        builder.Property(v => v.ImageUrl)
            .IsRequired()
            .HasMaxLength(250);

        builder.HasIndex(v => v.Code)
            .IsUnique();
    }
}
