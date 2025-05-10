using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Data;

public class AppIdentityDbContextSeed
{
    public static async Task SeedUsersAsync(UserManager<AppUser> userManager,
                RoleManager<AppRole> roleManager)
    {

        await SeedRolesAsync(roleManager);

        if (!userManager.Users.Any())
        {
            var rootUser = new AppUser
            {
                FirstName = "Admin",
                LastName = "NzooAdmin",
                DisplayName = "Admin",
                Email = "nzooadmin@test.com",
                UserName = "nzooadmin@test.com",

            };

            await userManager.CreateAsync(rootUser, "Pa$$w0rd");

            await userManager.AddToRoleAsync(rootUser, SeedRoleType.Root.ToString());
        }
    }


    private static async Task SeedRolesAsync(RoleManager<AppRole> roleManager)
    {
        if (!roleManager.Roles.Any())
        {
            var rootRole = new AppRole { Name = SeedRoleType.Root.ToString() };
            await roleManager.CreateAsync(rootRole);

            var adminRole = new AppRole { Name = SeedRoleType.Admin.ToString() };
            await roleManager.CreateAsync(adminRole);

            var clientRole = new AppRole { Name = SeedRoleType.Client.ToString() };
            await roleManager.CreateAsync(clientRole);
        }
    }


    public enum SeedRoleType
    {
        Root,
        Admin,
        Client,
    }
}
