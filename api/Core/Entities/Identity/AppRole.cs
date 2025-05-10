using System;
using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Identity;

public class AppRole : IdentityRole<int>
{
    //public ICollection<AppUser> Users { get; set; } = [];
}
