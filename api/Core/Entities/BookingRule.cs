using System;

namespace Core.Entities;

public class BookingRule : BaseEntity
{
    public required string Designation { get; set; }
    public required string Description { get; set; }
}
