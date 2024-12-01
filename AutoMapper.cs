using AutoMapper;
using HouseRules.Models;
using HouseRules.Models.DTOs;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {

        CreateMap<UserProfile, UserProfileDTO>();
        CreateMap<UserProfileDTO, UserProfile>();
        CreateMap<UserProfile, UserProfileForChoresDTO>();
        CreateMap<ChoreCompletion, ChoreCompletionDTO>();
        CreateMap<ChoreCompletionDTO, ChoreCompletion>();
        CreateMap<Chore, ChoreDTO>();
        CreateMap<ChoreDTO, Chore>();
        CreateMap<ChoreCompletion,ChoreCompletionForChoresDTO>();
        CreateMap<ChoreCompletionForChoresDTO,ChoreCompletion>();

    }
        
    
}