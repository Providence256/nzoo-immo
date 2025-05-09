using System;
using Core.Entities.Identity;

namespace Core.Interfaces;

public interface ITokenService
{
    Task<string> CreateToken(AppUser user);
}
