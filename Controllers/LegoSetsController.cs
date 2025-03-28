using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LegoTrade.Data;
using LegoTrade.Models;

namespace LegoTrade.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class LegoSetsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public LegoSetsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<LegoSet>>> GetLegoSets()
    {
        return await _context.LegoSets.ToListAsync();
    }

    [HttpGet("id/{id}")]
    public async Task<ActionResult<LegoSet>> GetLegoSet(string id)
    {
        var set = await _context.LegoSets.FindAsync(id);
        if (set == null)
        {
            return NotFound();
        }
        return set;
    }

    [HttpGet("number/{number}")]
    public async Task<ActionResult<LegoSet>> GetLegoSetByNumber(string number)
    {
        var set = await _context.LegoSets
            .FirstOrDefaultAsync(s => s.SetNumber == number);

        if (set == null)
        {
            return NotFound();
        }

        return set;
    }

    [HttpPost]
    public async Task<ActionResult<LegoSet>> CreateLegoSet(LegoSet set)
    {
        if (string.IsNullOrEmpty(set.Id))
        {
            set.Id = Guid.NewGuid().ToString();
        }

        _context.LegoSets.Add(set);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetLegoSet), new { id = set.Id }, set);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateLegoSet(string id, LegoSet set)
    {
        if (id != set.Id)
        {
            return BadRequest();
        }

        _context.Entry(set).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await _context.LegoSets.AnyAsync(e => e.Id == id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteLegoSet(string id)
    {
        var set = await _context.LegoSets.FindAsync(id);
        if (set == null)
        {
            return NotFound();
        }

        _context.LegoSets.Remove(set);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
