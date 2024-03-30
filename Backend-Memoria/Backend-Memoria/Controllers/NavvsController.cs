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
    public class NavvsController : ControllerBase
    {
        private readonly FullStackDbContext _context;

        public NavvsController(FullStackDbContext context)
        {
            _context = context;
        }

        // GET: api/Navvs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Navv>>> GetNavv()
        {
            var navvs = await _context.Navv
                .Include(s => s.SocialMedia)
                .Include(c => c.Contact)
                .ToListAsync();

            var titleSubtitles = await _context.TitleSubtitle.ToListAsync();

            return Ok(new { Navvs = navvs, TitleSubtitles = titleSubtitles });
        }

        // GET: api/Navvs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Navv>> GetNavv(int id)
        {
            var navv = await _context.Navv.FindAsync(id);

            if (navv == null)
            {
                return NotFound();
            }

            return navv;
        }

        // PUT: api/Navvs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNavv(int id, Navv navv)
        {
            if (id != navv.Id)
            {
                return BadRequest();
            }

            _context.Entry(navv).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NavvExists(id))
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

        // POST: api/Navvs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Navv>> PostNavv(Navv navv)
        {
            _context.Navv.Add(navv);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNavv", new { id = navv.Id }, navv);
        }

        // DELETE: api/Navvs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNavv(int id)
        {
            var navv = await _context.Navv.FindAsync(id);
            if (navv == null)
            {
                return NotFound();
            }

            _context.Navv.Remove(navv);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NavvExists(int id)
        {
            return _context.Navv.Any(e => e.Id == id);
        }
    }
}
