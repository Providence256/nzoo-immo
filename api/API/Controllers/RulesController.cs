using API.DTOs.RuleDto;
using AutoMapper;
using Core.Entities;
using Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RulesController(IGenericRepository<Rule> repo, IMapper mapper) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Rule>>> GetRules()
        {
            return Ok(await repo.GetAllAsync());
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Rule>> GetRule(int id)
        {
            var rule = await repo.GetByIdAsync(id);

            if (rule == null) return NotFound();

            return rule;
        }

        [HttpPost]
        public async Task<ActionResult<Rule>> CreateRule(RuleRequest request)
        {

            var rule = mapper.Map<Rule>(request);
            await repo.AddAsync(rule);


            return CreatedAtAction("GetRules", new { id = rule.Id });


        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateRule(int id, RuleRequest request)
        {
            var existingRule = await repo.GetByIdAsync(id);

            if (existingRule == null)
            {
                return NotFound($"Rule with ID {id} not found");
            }

            mapper.Map(request, existingRule);

            await repo.UpdateAsync(existingRule);


            return NoContent();


        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteRule(int id)
        {
            var rule = await repo.GetByIdAsync(id);
            if (rule == null) return NotFound();

            await repo.DeleteAsync(rule);

            return NoContent();

        }
    }
}
