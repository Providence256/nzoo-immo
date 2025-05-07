using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Data;

public class AppIdentityDbContextSeed
{
    public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
    {
        if (!userManager.Users.Any())
        {
            var user = new AppUser
            {
                FirstName = "Musaghi",
                LastName = "Zakindi",
                DisplayName = "Providence",
                Email = "providence@test.com",
            };

            await userManager.CreateAsync(user, "Pa$$w0rd");
        }
    }
}
