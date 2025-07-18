using API.DTOs.CancellationPolicyDto;
using AutoMapper;
using Core.Entities;
using Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CancellationPoliciesController(IGenericRepository<CancellationPolicy> repo, IMapper mapper) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<CancellationPolicy>>> GetCancellationPolicies()
        {
            return Ok(await repo.GetAllAsync());
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<CancellationPolicy>> GetCancellationPolicy(int id)
        {
            var policy = await repo.GetByIdAsync(id);

            if (policy == null) return NotFound();

            return Ok(policy);
        }

        [HttpPost]
        public async Task<ActionResult<CancellationPolicy>> CreateCancellationPolicy(CancellationPolicyRequest request)
        {

            var policy = mapper.Map<CancellationPolicy>(request);
            await repo.AddAsync(policy);


            return CreatedAtAction("GetCancellationPolicies", new { id = policy.Id });


        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateCancellationPolicy(int id, CancellationPolicyRequest request)
        {
            var existingPolicy = await repo.GetByIdAsync(id);

            if (existingPolicy == null)
            {
                return NotFound($"Type with ID {id} not found");
            }

            mapper.Map(request, existingPolicy);

            await repo.UpdateAsync(existingPolicy);


            return NoContent();


        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteCancellationPolicy(int id)
        {
            var policy = await repo.GetByIdAsync(id);
            if (policy == null) return NotFound();

            await repo.DeleteAsync(policy);

            return NoContent();

        }
    }
}
