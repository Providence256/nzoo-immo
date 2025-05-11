using System.Security.Claims;
using API.DTOs.AccountDto;
using API.Helpers;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController(
        UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager,
        ITokenService tokenService
        ) : ControllerBase
    {

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await userManager.FindByEmailAsync(loginDto.Email);

            if (user == null) return Unauthorized("You are not authorized");

            var result = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized("Password not correct");

            var roles = await userManager.GetRolesAsync(user);

            return new UserDto
            {
                Id = user.Id,
                Email = user.Email!,
                DisplayName = user.DisplayName,
                Token = await tokenService.CreateToken(user),
                Role = roles.FirstOrDefault()!,

            };
        }

        [HttpGet("google-login")]
        public IActionResult GoogleLogin()
        {
            var properties = new AuthenticationProperties
            {
                RedirectUri = Url.Action(nameof(GoogleResponse)),
                Items =
                {
                    {"returnUrl", Url.Content("~/")}
                }
            };

            return Challenge(properties, GoogleDefaults.AuthenticationScheme);
        }

        [HttpGet("google-response")]
        public async Task<IActionResult> GoogleResponse()
        {
            var authenticateResult = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            if (!authenticateResult.Succeeded)
                return BadRequest("Google authentication failed");

            var emailClaim = authenticateResult.Principal.FindFirst(ClaimTypes.Email);
            if (emailClaim == null)
                return BadRequest("Email not provided by google authentication");

            var email = emailClaim.Value;

            var user = await userManager.FindByEmailAsync(email);

            if (user == null)
            {
                var nameClaim = authenticateResult.Principal.FindFirst(ClaimTypes.Name);
                var name = nameClaim?.Value ?? "Google User";

                var nameParts = name.Split(' ');
                var firstName = nameParts.FirstOrDefault() ?? "";
                var lastName = nameParts.Length > 1 ? nameParts.Last() : "";

                user = new AppUser
                {
                    FirstName = firstName,
                    LastName = lastName,
                    DisplayName = name,
                    Email = email,
                    UserName = email,
                    EmailConfirmed = true,
                };

                var result = await userManager.CreateAsync(user);

                if (!result.Succeeded)
                    return BadRequest("Failed to create user from Google auth");

                await userManager.AddToRoleAsync(user, RoleType.Client.ToString());
            }

            var roles = await userManager.GetRolesAsync(user);
            var userDto = new UserDto
            {
                Id = user.Id,
                Email = user.Email!,
                DisplayName = user.DisplayName,
                Token = await tokenService.CreateToken(user),
                Role = roles.FirstOrDefault()!,
            };

            var frontendUrl = "http://localhost:4200";
            var redirectUrl = $"{frontendUrl}/auth-callback?token={userDto.Token}&email={userDto.Email}&displayName={userDto.DisplayName}&role={userDto.Role}";


            return Redirect(redirectUrl);
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
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

            if (!result.Succeeded) return BadRequest("Not Registered");

            // Assign Client role to newly registered users
            await userManager.AddToRoleAsync(user, RoleType.Client.ToString());

            return new UserDto
            {
                Id = user.Id,
                DisplayName = user.DisplayName,
                Email = user.Email!,
                Token = await tokenService.CreateToken(user),
            };
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var user = await userManager.FindByEmailAsync(email!);

            return new UserDto
            {
                Id = user!.Id,
                Email = user.Email!,
                DisplayName = user.DisplayName,
                Token = await tokenService.CreateToken(user),
            };
        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            return await userManager.FindByEmailAsync(email) != null;
        }


    }


}
