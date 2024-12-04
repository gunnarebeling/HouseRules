using System.ComponentModel.DataAnnotations;

namespace HouseRules.Models;

public class Chore
{
    public int Id { get; set; }
    [Required]
    [MaxLength(100, ErrorMessage = "Chore names must be 100 characters or less")]
    public string Name { get; set; }
    [Range(1,5)]
    public int Difficulty { get; set; }
    public int ChoreFrequencyDays { get; set; }
    public List<UserProfile> UserProfiles { get; set; }
    public List<ChoreCompletion> choreCompletions {get; set;}

    
}