using API.DTOs.AccountDto;
using API.Helpers;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController(UserManager<AppUser> userManager,
                        ITokenService tokenService) : ControllerBase
    {
        [HttpPost("create-admin")]
        [Authorize(Roles = "Root")]  // Only Root users can create admins
        public async Task<ActionResult<UserDto>> CreateAdmin(RegisterDto registerDto)
        {
            var findByEmail = await userManager.FindByEmailAsync(registerDto.Email);

            if (findByEmail != null)
            {
                return BadRequest("Email already exists");
            }

            var admin = new AppUser
            {
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email,
            };

            var result = await userManager.CreateAsync(admin, registerDto.Password);

            if (!result.Succeeded) return BadRequest("Admin not registered");

            // Assign Admin role
            await userManager.AddToRoleAsync(admin, RoleType.Admin.ToString());

            var roles = await userManager.GetRolesAsync(admin);

            return new UserDto
            {
                Id = admin.Id,
                DisplayName = admin.DisplayName,
                Email = admin.Email,
                Token = await tokenService.CreateToken(admin),

            };
        }

        [HttpPost("create-user")]
        public async Task<ActionResult<UserDto>> CreateUser(RegisterDto registerDto)
        {
            var findByEmail = await userManager.FindByEmailAsync(registerDto.Email);

            if (findByEmail != null)
            {
                return BadRequest("Email already exists");
            }

            var user = new AppUser
            {
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email,

            };

            var result = await userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest("User not registered");

            // Assign Client role
            await userManager.AddToRoleAsync(user, RoleType.Client.ToString());

            var roles = await userManager.GetRolesAsync(user);

            return new UserDto
            {
                Id = user.Id,
                DisplayName = user.DisplayName,
                Email = user.Email,
                Token = await tokenService.CreateToken(user),
                Role = roles.FirstOrDefault(),

            };
        }

        [HttpGet("users")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var users = new List<UserDto>();

            foreach (var user in userManager.Users)
            {
                var roles = await userManager.GetRolesAsync(user);
                users.Add(new UserDto
                {
                    Id = user.Id,
                    DisplayName = user.DisplayName,
                    Email = user.Email!,
                });
            }

            return Ok(users);
        }
    }
}
