using AutoMapper;
using AutoMapper.QueryableExtensions;
using HouseRules.Data;
using HouseRules.Models;
using HouseRules.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
    [Authorize]
    public IActionResult GetDetails(string id)
    {
        ChoreDTO chore = _dbContext.Chores.ProjectTo<ChoreDTO>(_mapper.ConfigurationProvider).Single(c => c.Id == int.Parse(id));
        return Ok(chore);
        
    }

    [HttpPost("{id}/completed")]
    [Authorize]
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
    [Authorize(Roles="Admin")]
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

    [HttpPut("{id}")]
    [Authorize(Roles="Admin")]
    public IActionResult updateChore(SimpleChoreDTO choreObj, string id)
    {
        Chore chore =_dbContext.Chores.SingleOrDefault(c => c.Id == int.Parse(id));

        if (chore == null)
        {
            return NotFound();   
        }
        chore.Name = choreObj.Name;
        chore.ChoreFrequencyDays = choreObj.ChoreFrequencyDays;
        chore.Difficulty = choreObj.Difficulty;
            
        
        _dbContext.SaveChanges();

        return NoContent(); 
    }

    [HttpDelete("{id}")]
    [Authorize(Roles="Admin")]
    public IActionResult DeleteChore( string id)
    {
        Chore chore =_dbContext.Chores.SingleOrDefault(c => c.Id == int.Parse(id));

        if (chore == null)
        {
            return NotFound();   
        }
        _dbContext.Chores.Remove(chore);
        _dbContext.SaveChanges();

        return NoContent(); 
    }

    [HttpPost("{id}/assign")]
    [Authorize(Roles="Admin")]
    public IActionResult AssignUser(string id, string? userId)
    {
       
         Chore chore = _dbContext.Chores.Include(c => c.UserProfiles).SingleOrDefault(c => c.Id == int.Parse(id));
         UserProfile userProfile = _dbContext.UserProfiles.SingleOrDefault(u => u.Id == int.Parse(userId));

        if (userProfile == null || chore == null)
        {
            return BadRequest();
        }
        if (chore.UserProfiles.Any(u => u.Id == int.Parse(userId)))
        {
            return BadRequest("User is already assigned to this chore.");
        }

        chore.UserProfiles.Add(userProfile);
        _dbContext.SaveChanges();

        return Ok();

        
    }

    [HttpPost("{id}/unassign")]
    [Authorize(Roles="Admin")]
    public IActionResult UnassignUser(string id, string? userId)
    {
       
         Chore chore = _dbContext.Chores.Include(c => c.UserProfiles).SingleOrDefault(c => c.Id == int.Parse(id));
         UserProfile userProfile = _dbContext.UserProfiles.SingleOrDefault(u => u.Id == int.Parse(userId));

        if (userProfile == null || chore == null)
        {
            return BadRequest();
        }
        if (!chore.UserProfiles.Any(u => u.Id == int.Parse(userId)))
        {
            return BadRequest("User is not assigned chore.");
        }

        chore.UserProfiles.Remove(userProfile);
        _dbContext.SaveChanges();

        return Ok();

        
    }

}