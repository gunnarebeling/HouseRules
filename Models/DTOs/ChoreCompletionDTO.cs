using Microsoft.AspNetCore.SignalR;

namespace HouseRules.Models.DTOs;

public class ChoreCompletionDTO
{
    public int Id { get; set; }
    public int UserProfileId { get; set; }
    public UserProfileForChoresDTO UserProfile { get; set; }
    public int ChoreId { get; set; }

    public SimpleChoreDTO Chore {get; set;}
    public DateTime CompletedOn { get; set; }
}

public class ChoreCompletionForChoresDTO
{
    public int Id { get; set; }
    public int UserProfileId { get; set; }

    public DateTime CompletedOn { get; set; }
}

public class ChoreCompletionPostDTO 
{
    public int UserProfileId { get; set; }
    public int ChoreId { get; set; }
    public DateTime CompletedOn { get; set; }

}