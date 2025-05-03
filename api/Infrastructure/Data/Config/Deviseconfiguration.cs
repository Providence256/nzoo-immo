using System;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config;

public class Deviseconfiguration : IEntityTypeConfiguration<Devise>
{
    public void Configure(EntityTypeBuilder<Devise> builder)
    {
        builder.Property(d => d.Code)
            .IsRequired()
            .HasMaxLength(5);

        builder.Property(d => d.Designation)
            .IsRequired()
            .HasMaxLength(50);

        builder.HasIndex(d => d.Code)
            .IsUnique();
    }
}
