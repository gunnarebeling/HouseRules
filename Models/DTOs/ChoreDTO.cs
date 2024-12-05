namespace HouseRules.Models.DTOs;



public class ChoreDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Difficulty { get; set; }
    public int ChoreFrequencyDays { get; set; }

    public List<UserProfileForChoresDTO> UserProfiles { get; set; }

    public List<ChoreCompletionForChoresDTO> ChoreCompletions { get; set; }
    public bool Expired 
    {
        get
        {
           if (ChoreCompletions.Any() )
           {
            DateTime recentCompletion = ChoreCompletions.Max(c => c.CompletedOn) ;
            DateTime experationDate = recentCompletion.AddDays(ChoreFrequencyDays);
            return experationDate < DateTime.Now;
            
           }else
           {
                return true;
           } 
        }
    }

    
}

public class SimpleChoreDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Difficulty { get; set; }
    
    public int ChoreFrequencyDays { get; set; }

    
}



