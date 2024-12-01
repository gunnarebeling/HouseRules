using System.ComponentModel.DataAnnotations;

namespace HouseRules.Models;

public class Chore
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    public int Difficulty { get; set; }
    public int ChoreFrequencyDays { get; set; }
    public List<UserProfile> UserProfiles { get; set; }
    public List<ChoreCompletion> choreCompletions {get; set;}

    
}