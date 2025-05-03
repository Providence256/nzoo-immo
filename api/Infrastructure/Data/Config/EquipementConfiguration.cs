using System;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config;

public class EquipementConfiguration : IEntityTypeConfiguration<Equipement>
{
    public void Configure(EntityTypeBuilder<Equipement> builder)
    {
        builder.Property(e => e.Code)
             .IsRequired()
             .HasMaxLength(20);

        builder.Property(e => e.Designation)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(e => e.Icon)
            .IsRequired()
            .HasMaxLength(100);

        builder.HasIndex(e => e.Code)
            .IsUnique();
    }
}
