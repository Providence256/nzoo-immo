using System;
using System.Security.Claims;

namespace API.Helpers;

public static class ClaimsPrincipalHelper
{
    public static int GetUserId(this ClaimsPrincipal user)
    {
        if (user == null) throw new ArgumentException(nameof(user));

        var userIdClaim = user.FindFirst(ClaimTypes.NameIdentifier) ??
                            user.FindFirst("sub");

        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out var userId))
        {
            throw new UnauthorizedAccessException("User ID not found in token");
        }

        return userId;
    }
}
