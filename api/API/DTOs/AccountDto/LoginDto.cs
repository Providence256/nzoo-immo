using System;

namespace API.DTOs.AccountDto;

public class LoginDto
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}
