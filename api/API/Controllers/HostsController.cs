using System.Security.Claims;
using API.DTOs.HostDto;
using API.Helpers;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
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
                    IGenericRepository<HostEntity> hostRepo,
                    ITokenService tokenService) : ControllerBase
    {

        [HttpPost("become-host")]
        [Authorize(Roles = "Client")]
        public async Task<ActionResult<HostResponse>> BecomeHost(BecomeHostRequest request)
        {
            var userEmail = User.FindFirstValue(ClaimTypes.Email);
            var user = await userManager.FindByEmailAsync(userEmail!);

            if (user == null)
                return Unauthorized("User not found");

            var existingHost = await hostRepo.GetAllAsync();
            if (existingHost.Any(h => h.UserId == user.Id))
                return BadRequest("User already a host");


            var host = new HostEntity
            {
                UserId = user.Id,
                PhoneNumber = request.PhoneNumber,
                HostDescription = request.HostDescription,
                JoinedDate = DateTime.UtcNow,
                IsActive = true,
                IsVerified = false // verify later through a verification process
            };

            await hostRepo.AddAsync(host);

            var token = await tokenService.CreateToken(user);

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
                IsActive = host.IsActive,
                Token = token,
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
        [HttpGet("all-hosts")]
        [Authorize(Roles = "Admin, Root")]
        public async Task<ActionResult<IEnumerable<HostResponse>>> GetAllHosts()
        {
            var hosts = await hostRepo.GetAllAsync();
            var allhostResponse = new List<HostResponse>();

            foreach (var host in hosts)
            {
                var user = await userManager.FindByIdAsync(host.UserId.ToString());
                if (user != null)
                {
                    allhostResponse.Add(new HostResponse
                    {
                        Id = host.Id,
                        UserId = host.UserId,
                        UserName = user.UserName,
                        Email = user.Email,
                        PhoneNumber = host.PhoneNumber,
                        HostDescription = host.HostDescription,
                        JoinedDate = host.JoinedDate,
                        IsActive = host.IsActive,
                        IsVerified = host.IsVerified,
                        Rating = host.Rating,
                        TotalReviews = host.TotalReviews,
                        TotalBookings = host.TotalBookings,

                    });
                }
            }

            return Ok(allhostResponse.OrderByDescending(h => h.JoinedDate));
        }

        [HttpGet("host/{id}")]
        [Authorize(Roles = "Admin,Root")]
        public async Task<ActionResult<HostResponse>> GetHostById(int id)
        {
            var host = await hostRepo.GetByIdAsync(id);

            if (host == null)
                return NotFound("Host not found");

            var user = await userManager.FindByIdAsync(host.UserId.ToString());

            if (user == null)
                return NotFound("User not found");

            var response = new HostResponse
            {
                Id = host.Id,
                UserId = host.UserId,
                UserName = user.UserName,
                Email = user.Email,
                PhoneNumber = host.PhoneNumber,
                HostDescription = host.HostDescription,
                JoinedDate = host.JoinedDate,
                IsActive = host.IsActive,
                IsVerified = host.IsVerified,
                Rating = host.Rating,
                TotalReviews = host.TotalReviews,
                TotalBookings = host.TotalBookings
            };

            return Ok(response);
        }





        [HttpPost("verify/{hostId}")]
        [Authorize(Roles = "Root, Admin")]
        public async Task<ActionResult> VerifyHost(int hostId, ApproveHostRequest request)
        {
            var host = await hostRepo.GetByIdAsync(hostId);
            if (host == null)
                return NotFound("Host not found");

            var user = await userManager.FindByIdAsync(host.UserId.ToString());

            if (user == null)
                return NotFound("User not found");

            if (request.IsApproved)
            {
                host.IsVerified = true;
                host.VerifiedDate = DateTime.UtcNow;

                await hostRepo.UpdateAsync(host);

                var userRoles = await userManager.GetRolesAsync(user);

                if (userRoles.Contains(RoleType.Client.ToString()))
                {
                    await userManager.RemoveFromRoleAsync(user, RoleType.Client.ToString());
                }

                await userManager.AddToRoleAsync(user, RoleType.Host.ToString());

                return Ok("Host verified successfully");
            }
            else
            {
                await hostRepo.DeleteAsync(host);

                return Ok(new { message = " Host application rejected" });
            }
        }
    }
}
