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
    public class SocialMediasController : ControllerBase
    {
        private readonly FullStackDbContext _context;

        public SocialMediasController(FullStackDbContext context)
        {
            _context = context;
        }

        // GET: api/SocialMedias
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SocialMedia>>> GetSocialMedia()
        {
            return await _context.SocialMedia.ToListAsync();
        }

        // GET: api/SocialMedias/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SocialMedia>> GetSocialMedia(int id)
        {
            var socialMedia = await _context.SocialMedia.FindAsync(id);

            if (socialMedia == null)
            {
                return NotFound();
            }

            return socialMedia;
        }

        // PUT: api/SocialMedias/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSocialMedia(int id, SocialMedia socialMedia)
        {
            if (id != socialMedia.Id)
            {
                return BadRequest();
            }

            _context.Entry(socialMedia).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SocialMediaExists(id))
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

        // POST: api/SocialMedias
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SocialMedia>> PostSocialMedia(SocialMedia socialMedia)
        {
            _context.SocialMedia.Add(socialMedia);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSocialMedia", new { id = socialMedia.Id }, socialMedia);
        }

        // DELETE: api/SocialMedias/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSocialMedia(int id)
        {
            var socialMedia = await _context.SocialMedia.FindAsync(id);
            if (socialMedia == null)
            {
                return NotFound();
            }

            _context.SocialMedia.Remove(socialMedia);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SocialMediaExists(int id)
        {
            return _context.SocialMedia.Any(e => e.Id == id);
        }
    }
}
