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
    public class HeadersController : ControllerBase
    {
        private readonly FullStackDbContext _context;

        public HeadersController(FullStackDbContext context)
        {
            _context = context;
        }

        // GET: api/Headers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Header>>> GetHeader()
        {
            return await _context.Headers.ToListAsync();
        }

        // GET: api/Headers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Header>> GetHeader(int id)
        {
            var header = await _context.Headers.FindAsync(id);

            if (header == null)
            {
                return NotFound();
            }

            return header;
        }

        // PUT: api/Headers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHeader(int id, Header header)
        {
            if (id != header.Id)
            {
                return BadRequest();
            }

            _context.Entry(header).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HeaderExists(id))
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

        // POST: api/Headers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Header>> PostHeader(Header header)
        {
            _context.Headers.Add(header);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHeader", new { id = header.Id }, header);
        }

        // DELETE: api/Headers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHeader(int id)
        {
            var header = await _context.Headers.FindAsync(id);
            if (header == null)
            {
                return NotFound();
            }

            _context.Headers.Remove(header);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HeaderExists(int id)
        {
            return _context.Headers.Any(e => e.Id == id);
        }
    }
}
