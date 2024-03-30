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
    public class PricesController : ControllerBase
    {
        private readonly FullStackDbContext _context;

        public PricesController(FullStackDbContext context)
        {
            _context = context;
        }

        // GET: api/Prices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Prices>>> GetPrices()
        {
            return await _context.Prices
                .Include(p => p.PricesCharacteristics)
                .Include(p => p.TitleSubtitle) 
                .ToListAsync();
        }

        // GET: api/Prices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Prices>> GetPrices(int id)
        {
            var prices = await _context.Prices
                .Include(p => p.PricesCharacteristics)
                .Include(p => p.TitleSubtitle)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (prices == null)
            {
                return NotFound();
            }

            return prices;
        }


        // PUT: api/Prices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPrices(int id, Prices prices)
        {
            if (id != prices.Id)
            {
                return BadRequest();
            }

            _context.Entry(prices).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PricesExists(id))
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

        // POST: api/Prices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Prices>> PostPrices(Prices prices)
        {
            _context.Prices.Add(prices);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPrices", new { id = prices.Id }, prices);
        }

        // POST: api/PricesCharacteristics
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("PricesCharacteristics")]
        public async Task<ActionResult<PricesCharacteristics>> PostPricesCharacteristics(PricesCharacteristics pricesCharacteristics)
        {
            _context.PricesCharacteristics.Add(pricesCharacteristics);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPrices", new { id = pricesCharacteristics.Id }, pricesCharacteristics);
        }

        // DELETE: api/Prices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePrices(int id)
        {
            var prices = await _context.Prices.FindAsync(id);
            if (prices == null)
            {
                return NotFound();
            }

            _context.Prices.Remove(prices);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PricesExists(int id)
        {
            return _context.Prices.Any(e => e.Id == id);
        }


        // DELETE: api/PricesCharacteristics/5
        [HttpDelete("PricesCharacteristics/{id}")]
        public async Task<IActionResult> DeletePricesCharacteristics(int id)
        {
            var pricesCharacteristics = await _context.PricesCharacteristics.FindAsync(id);
            if (pricesCharacteristics == null)
            {
                return NotFound();
            }

            _context.PricesCharacteristics.Remove(pricesCharacteristics);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PricesCharacteristicsExists(int id)
        {
            return _context.PricesCharacteristics.Any(e => e.Id == id);
        }

    }


}
