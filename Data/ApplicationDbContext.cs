using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;
using LegoTrade.Models;

namespace LegoTrade.Data;

public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
        : base(options, operationalStoreOptions)
    {
    }

    public DbSet<InventoryItem> InventoryItems { get; set; }

    public DbSet<LegoSet> LegoSets { get; set; }
    public DbSet<LegoPart> LegoParts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<InventoryItem>().HasKey(x => x.Id);
        modelBuilder.Entity<InventoryItem>().HasIndex(x => x.ItemId);


        modelBuilder.Entity<LegoSet>().HasKey(x => x.Id);
        modelBuilder.Entity<LegoSet>().HasIndex(x => x.SetNumber).IsUnique();

        modelBuilder.Entity<LegoPart>().HasKey(x => x.Id);
        modelBuilder.Entity<LegoPart>().HasIndex(x => x.PartNumber).IsUnique();
    }
}

