using System;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config;

public class ListingPriceConfiguration : IEntityTypeConfiguration<ListingPrice>
{
    public void Configure(EntityTypeBuilder<ListingPrice> builder)
    {
        builder.HasOne(p => p.Devise)
               .WithMany()
               .HasForeignKey(p => p.DeviseId);

        builder.Property(p => p.PrixBase)
            .IsRequired()
            .HasColumnType("decimal(18,2)");

        builder.Property(p => p.Reduction)
            .HasColumnType("decimal(18,2)");

        builder.Property(p => p.ReductionHebdo)
            .HasColumnType("decimal(18,2)");

        builder.Property(p => p.ReductionMensu)
            .HasColumnType("decimal(18,2)");

        builder.Property(p => p.FraisMenage)
            .HasColumnType("decimal(18,2)");

        builder.Property(p => p.PersoSuppl)
            .HasColumnType("decimal(18,2)");
    }
}
