using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace LegoTrade.Models;

public class LegoPart
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string PartNumber { get; set; }
}