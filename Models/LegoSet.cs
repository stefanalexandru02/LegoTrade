using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace LegoTrade.Models;

public class LegoSet
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public string Name { get; set; }
    public string SetNumber { get; set; }
}