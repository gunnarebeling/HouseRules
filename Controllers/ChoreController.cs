using AutoMapper;
using AutoMapper.QueryableExtensions;
using HouseRules.Data;
using HouseRules.Models;
using HouseRules.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HouseRules.Controllers;
[Controller]
[Route("api/[controller]")]
public class ChoreController: ControllerBase
{
    private  HouseRulesDbContext _dbContext;
    private IMapper _mapper;
    public ChoreController(HouseRulesDbContext db, IMapper mapper)
    {
        _dbContext = db;
        _mapper = mapper;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        List<ChoreDTO> chore = _dbContext.Chores.ProjectTo<ChoreDTO>(_mapper.ConfigurationProvider).ToList();
        return Ok(chore);
        
    }

    [HttpGet("{id}")]
    // [Authorize]
    public IActionResult GetDetails(string id)
    {
        ChoreDTO chore = _dbContext.Chores.ProjectTo<ChoreDTO>(_mapper.ConfigurationProvider).Single(c => c.Id == int.Parse(id));
        return Ok(chore);
        
    }

    [HttpPost("{id}/completed")]
    // [Authorize]
    public IActionResult PostChoreCompletion(string id, string? userId)
    {
        if (userId == null)
        {
            return BadRequest();
        }
         ChoreCompletion chore = new ChoreCompletion 
         {
            ChoreId= int.Parse(id), 
            UserProfileId = int.Parse(userId),
            CompletedOn = DateTime.Now
        };
        _dbContext.ChoreCompletions.Add(chore);
        _dbContext.SaveChanges();

        return NoContent();

        
    }

    [HttpPost]
    // [Authorize]
    public IActionResult PostChore(SimpleChoreDTO choreObj)
    {
       
         Chore chore = new Chore
         {
            Name = choreObj.Name, 
            ChoreFrequencyDays = choreObj.ChoreFrequencyDays,
            Difficulty = choreObj.Difficulty
            
        };
        _dbContext.Chores.Add(chore);
        _dbContext.SaveChanges();

        return Created($"/api/chores/{chore.Id}", chore);

        
    }
}