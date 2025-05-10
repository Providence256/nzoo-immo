using System;

namespace API.DTOs.AccountDto;

public class UserDto
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string Token { get; set; } = string.Empty;
}
