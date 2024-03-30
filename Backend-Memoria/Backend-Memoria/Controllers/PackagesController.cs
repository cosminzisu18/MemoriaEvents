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
    public class PackagesController : ControllerBase
    {
        private readonly FullStackDbContext _context;

        public PackagesController(FullStackDbContext context)
        {
            _context = context;
        }

        // GET: api/Packages
        [HttpGet]
        public async Task<ActionResult<object>> GetPackages()
        {
            var packages = await _context.Packages
                .Include(a => a.TitleSubtitle)
                .Include(ps => ps.PackageServices)
                    .ThenInclude(ps => ps.Service)
                .Select(p => new
                {
                    Id = p.Id,
                    PackageType = p.PackageType,
                    PackageInfo = p.PackageInfo,
                    PackagePrice = p.PackagePrice,
                    TitleSubtitleId = p.TitleSubtitleId,
                    TitleSubtitle = p.TitleSubtitle,
                    Services = p.PackageServices.Select(ps => ps.Service.ServiceName).ToList()
                })
                .ToListAsync();


            var allServices = await _context.Services.Select(s => s.ServiceName).ToListAsync();

            var result = new { Packages = packages, Services = allServices };

            return result;
        }

        // GET: api/Packages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetPackages(int id)
        {
            var packages = await _context.Packages
                .Where(p => p.Id == id)
                .Include(a => a.TitleSubtitle)
                .Include(ps => ps.PackageServices)
                    .ThenInclude(ps => ps.Service)
                .Select(p => new
                {
                    Id = p.Id,
                    PackageType = p.PackageType,
                    PackageInfo = p.PackageInfo,
                    PackagePrice = p.PackagePrice,
                    TitleSubtitleId = p.TitleSubtitleId,
                    TitleSubtitle = p.TitleSubtitle,
                    Services = p.PackageServices.Select(ps => new
                    {
                        Id = ps.Service.Id,
                        ServiceName = ps.Service.ServiceName
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (packages == null)
            {
                return NotFound();
            }

            var allServices = await _context.Services.Select(s => new
            {
                Id = s.Id,
                ServiceName = s.ServiceName
            }).ToListAsync();

            var result = new { Packages = packages, Services = allServices };

            return result;
        }

        // PUT: api/Packages/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPackages(int id, Packages packages)
        {
            if (id != packages.Id)
            {
                return BadRequest();
            }

            var existingPackage = await _context.Packages.FindAsync(id);
            if (existingPackage == null)
            {
                return NotFound();
            }

            // Actualizare proprietăți
            existingPackage.PackageType = packages.PackageType;
            existingPackage.PackageInfo = packages.PackageInfo;
            existingPackage.PackagePrice = packages.PackagePrice;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PackagesExists(id))
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


        // POST: api/Packages
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Packages>> PostPackages(Packages packages)
        {
            _context.Packages.Add(packages);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPackages", new { id = packages.Id }, packages);
        }

        // DELETE: api/Packages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePackages(int id)
        {
            var packages = await _context.Packages.FindAsync(id);
            if (packages == null)
            {
                return NotFound();
            }

            _context.Packages.Remove(packages);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PackagesExists(int id)
        {
            return _context.Packages.Any(e => e.Id == id);
        }
    }
}
