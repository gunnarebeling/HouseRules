using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using HouseRules.Models;
using Microsoft.AspNetCore.Identity;

namespace HouseRules.Data;
public class HouseRulesDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
    
    public DbSet<UserProfile> UserProfiles { get; set; }

    public DbSet<Chore> Chores { get; set; }
    public DbSet<ChoreCompletion> ChoreCompletions { get; set; }

    public HouseRulesDbContext(DbContextOptions<HouseRulesDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Administrator",
            Email = "admina@strator.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Admina",
            LastName = "Strator",
            Address = "101 Main Street",
            
        });

        modelBuilder.Entity<Chore>().HasData(new Chore[]
        {
            new Chore
            {
                Id = 1,
                Name = "Vacuum the house",
                Difficulty = 3,
                ChoreFrequencyDays = 7
            },
            new Chore
            {
                Id = 2,
                Name = "Wash the dishes",
                Difficulty = 2,
                ChoreFrequencyDays = 1
            },
            new Chore
            {
                Id = 3,
                Name = "Mow the lawn",
                Difficulty = 4,
                ChoreFrequencyDays = 14
            },
            new Chore
            {
                Id = 4,
                Name = "Clean the bathroom",
                Difficulty = 5,
                ChoreFrequencyDays = 10
            },
            new Chore
            {
                Id = 5,
                Name = "Take out the trash",
                Difficulty = 1,
                ChoreFrequencyDays = 2
            }
        });

        modelBuilder.Entity<ChoreCompletion>().HasData(new ChoreCompletion[]
        {
            new ChoreCompletion
            {
                Id = 1,
                UserProfileId = 1, // Assuming the only user has ID 1
                ChoreId = 2,       // Reference to the "Wash the dishes" chore
                CompletedOn = DateTime.Now.AddDays(-1) // Completed yesterday
            },
            new ChoreCompletion
            {
                Id = 2,
                UserProfileId = 1, // Same user
                ChoreId = 4,       // Reference to the "Clean the bathroom" chore
                CompletedOn = DateTime.Now // Completed today
            }
        });

        modelBuilder.Entity<UserProfile>()
            .HasMany(up => up.Chores)
            .WithMany(s => s.UserProfiles)
            .UsingEntity(j => j.HasData(
                new { UserProfilesId = 1, ChoresId = 1 },
                new { UserProfilesId = 1, ChoresId = 3 }
            ));

        
    }
}