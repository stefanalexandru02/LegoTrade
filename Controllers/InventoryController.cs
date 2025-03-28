using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LegoTrade.Data;
using System.Security.Claims;

namespace LegoTrade.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class InventoryController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public InventoryController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<InventoryItem>>> GetMyInventory()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return await _context.InventoryItems
            .Where(i => i.UserId == userId)
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<InventoryItem>> GetInventoryItem(string id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var item = await _context.InventoryItems
            .FirstOrDefaultAsync(i => i.Id == id && i.UserId == userId);

        if (item == null)
        {
            return NotFound();
        }

        return item;
    }

    [HttpPost]
    public async Task<ActionResult<InventoryItem>> CreateInventoryItem(InventoryItem item)
    {
        item.UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        item.CreatedAt = DateTime.UtcNow;

        _context.InventoryItems.Add(item);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetInventoryItem), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateInventoryItem(string id, InventoryItem item)
    {
        if (id != item.Id)
        {
            return BadRequest();
        }

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var existingItem = await _context.InventoryItems
            .FirstOrDefaultAsync(i => i.Id == id && i.UserId == userId);

        if (existingItem == null)
        {
            return NotFound();
        }

        existingItem.Quantity = item.Quantity;
        existingItem.Condition = item.Condition;
        existingItem.Notes = item.Notes;
        existingItem.UpdatedAt = DateTime.UtcNow;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await _context.InventoryItems.AnyAsync(i => i.Id == id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteInventoryItem(string id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var item = await _context.InventoryItems
            .FirstOrDefaultAsync(i => i.Id == id && i.UserId == userId);

        if (item == null)
        {
            return NotFound();
        }

        _context.InventoryItems.Remove(item);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
