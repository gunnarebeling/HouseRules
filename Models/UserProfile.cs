using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace HouseRules.Models;

public class UserProfile
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }
    [EmailAddress(ErrorMessage ="must be a valid email")]
    public string Email {get; set;}

    public string IdentityUserId { get; set; }

    public IdentityUser IdentityUser { get; set; }
    public List<Chore> Chores { get; set; }

    public List<ChoreCompletion> ChoreCompletions {get; set;}

}

