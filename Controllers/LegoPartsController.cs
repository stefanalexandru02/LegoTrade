using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LegoTrade.Data;
using LegoTrade.Models;

namespace LegoTrade.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class LegoPartsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public LegoPartsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<LegoPart>>> GetLegoParts()
    {
        return await _context.LegoParts.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<LegoPart>> GetLegoPart(string id)
    {
        var part = await _context.LegoParts.FindAsync(id);
        if (part == null)
        {
            return NotFound();
        }
        return part;
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<LegoPart>> CreateLegoPart(LegoPart part)
    {
        _context.LegoParts.Add(part);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetLegoPart), new { id = part.Id }, part);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateLegoPart(string id, LegoPart part)
    {
        if (id != part.Id)
        {
            return BadRequest();
        }

        _context.Entry(part).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await _context.LegoParts.AnyAsync(e => e.Id == id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteLegoPart(string id)
    {
        var part = await _context.LegoParts.FindAsync(id);
        if (part == null)
        {
            return NotFound();
        }

        _context.LegoParts.Remove(part);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
