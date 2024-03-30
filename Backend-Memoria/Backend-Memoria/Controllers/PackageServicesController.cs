using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend_Memoria.Data;
using Backend_Memoria.Models;

namespace Backend_Memoria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PackageServicesController : ControllerBase
    {
        private readonly FullStackDbContext _context;

        public PackageServicesController(FullStackDbContext context)
        {
            _context = context;
        }

        // GET: api/PackageServices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PackageService>>> GetPackageService()
        {
            return await _context.PackageService.ToListAsync();
        }

        // GET: api/PackageServices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PackageService>> GetPackageService(int id)
        {
            var packageService = await _context.PackageService.FindAsync(id);

            if (packageService == null)
            {
                return NotFound();
            }

            return packageService;
        }

        // PUT: api/PackageServices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPackageService(int id, PackageService packageService)
        {
            if (id != packageService.Id)
            {
                return BadRequest();
            }

            _context.Entry(packageService).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PackageServiceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PackageServices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PackageService>> PostPackageService(PackageService packageService)
        {
            _context.PackageService.Add(packageService);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPackageService", new { id = packageService.Id }, packageService);
        }

        // DELETE: api/PackageServices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePackageService(int id)
        {
            var packageService = await _context.PackageService.FindAsync(id);
            if (packageService == null)
            {
                return NotFound();
            }

            _context.PackageService.Remove(packageService);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PackageServiceExists(int id)
        {
            return _context.PackageService.Any(e => e.Id == id);
        }
    }
}
