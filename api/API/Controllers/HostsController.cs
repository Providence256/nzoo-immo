using System.Security.Claims;
using API.DTOs.HostDto;
using API.Helpers;
using Core.Entities;
using Core.Entities.Identity;
using Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HostsController(
                    UserManager<AppUser> userManager,
                    IGenericRepository<HostEntity> hostRepo) : ControllerBase
    {

        [HttpPost("become-host")]
        [Authorize]
        public async Task<ActionResult<HostResponse>> BecomeHost(BecomeHostRequest request)
        {
            var userEmail = User.FindFirstValue(ClaimTypes.Email);
            var user = await userManager.FindByEmailAsync(userEmail!);

            if (user == null)
                return Unauthorized("User not found");

            var existingHost = await hostRepo.GetAllAsync();
            if (existingHost.Any(h => h.UserId == user.Id))
                return BadRequest("User already a host");

            var roleResult = await userManager.AddToRoleAsync(user, RoleType.Host.ToString());

            if (!roleResult.Succeeded)
                return BadRequest("Failed to assign host role");

            var host = new HostEntity
            {
                UserId = user.Id,
                PhoneNumber = request.PhoneNumber,
                JoinedDate = DateTime.UtcNow,
                IsActive = true,
                IsVerified = false // verify later through a verification process
            };

            await hostRepo.AddAsync(host);

            var response = new HostResponse
            {
                Id = host.Id,
                UserId = host.UserId,
                UserName = user.UserName,
                Email = user.Email,
                PhoneNumber = host.PhoneNumber,
                JoinedDate = host.JoinedDate,
                Rating = host.Rating,
                TotalReviews = host.TotalReviews,
                TotalBookings = host.TotalBookings,
                IsVerified = host.IsVerified,
                IsActive = host.IsActive
            };

            return Ok(response);
        }

        [HttpGet("profile")]
        [Authorize(Roles = "Host")]
        public async Task<ActionResult<HostResponse>> GetHostProfile()
        {
            var userEmail = User.FindFirstValue(ClaimTypes.Email);
            var user = await userManager.FindByEmailAsync(userEmail!);

            if (user == null)
                return Unauthorized("User not found");

            var hosts = await hostRepo.GetAllAsync();

            var host = hosts.FirstOrDefault(h => h.UserId == user.Id);

            if (host == null)
                return NotFound("Host profile not found");

            var response = new HostResponse
            {
                Id = host.Id,
                UserId = host.UserId,
                UserName = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                JoinedDate = host.JoinedDate,
                Rating = host.Rating,
                TotalReviews = host.TotalReviews,
                TotalBookings = host.TotalBookings,
                IsVerified = host.IsVerified,
                IsActive = host.IsActive
            };

            return Ok(response);
        }

        [HttpPut("update-profile")]
        [Authorize(Roles = "Host")]
        public async Task<ActionResult<HostResponse>> UpdateHostProfile(UpdateHostRequest request)
        {
            var userEmail = User.FindFirstValue(ClaimTypes.Email);
            var user = await userManager.FindByEmailAsync(userEmail!);

            if (user == null)
                return Unauthorized("User not found");

            var hosts = await hostRepo.GetAllAsync();
            var host = hosts.FirstOrDefault(h => h.UserId == user.Id);

            if (host == null)
                return NotFound("Host profile not found");

            host.PhoneNumber = request.PhoneNumber;

            await hostRepo.UpdateAsync(host);

            var response = new HostResponse
            {
                Id = host.Id,
                UserId = host.UserId,
                UserName = user.UserName,
                Email = user.Email,
                PhoneNumber = host.PhoneNumber,
                JoinedDate = host.JoinedDate,
                Rating = host.Rating,
                TotalReviews = host.TotalReviews,
                TotalBookings = host.TotalBookings,
                IsVerified = host.IsVerified,
                IsActive = host.IsActive
            };

            return Ok(response);

        }
        [HttpPost("verify")]
        [Authorize(Roles = "Root")]
        public async Task<ActionResult> VerifyHost(int hostId)
        {
            var host = await hostRepo.GetByIdAsync(hostId);
            if (host == null)
                return NotFound("Host not found");

            host.IsVerified = true;
            host.VerifiedDate = DateTime.UtcNow;

            await hostRepo.UpdateAsync(host);

            return Ok("Host verified successfully");
        }
    }
}
