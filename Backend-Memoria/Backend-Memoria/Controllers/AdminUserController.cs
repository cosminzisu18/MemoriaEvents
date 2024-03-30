using Microsoft.AspNetCore.Mvc;
using Backend_Memoria.Data;
using Backend_Memoria.Models;
using System.Linq;
using Microsoft.AspNetCore.Identity.Data;

namespace Backend_Memoria.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly FullStackDbContext _context;

        public AuthController(FullStackDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login(AdminUser user)
        {
            var userAvailable = _context.AdminUsers.FirstOrDefault(u => u.Username == user.Username && u.Password == user.Password);

            if (userAvailable != null)
            {
                return Ok(new { message = "Success" });
            }

            return BadRequest(new { message = "Invalid credentials" });
        }
    }
}
