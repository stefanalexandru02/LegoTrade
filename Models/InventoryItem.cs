using System.ComponentModel.DataAnnotations;

namespace LegoTrade.Data;

public enum ItemType
{
    Set,
    Part
}

public enum ItemCondition
{
    New,
    Used,
    Incomplete
}

public class InventoryItem
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [Required]
    public string UserId { get; set; } = null!;

    [Required]
    public ItemType Type { get; set; }

    [Required]
    [StringLength(50)]
    public string ItemId { get; set; } = null!;

    [Required]
    [Range(1, int.MaxValue)]
    public int Quantity { get; set; }

    [Required]
    public ItemCondition Condition { get; set; }

    [StringLength(500)]
    public string? Notes { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }
}