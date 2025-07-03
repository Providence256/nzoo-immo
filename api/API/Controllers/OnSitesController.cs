using API.DTOs.OnSiteDto;
using AutoMapper;
using Core.Entities;
using Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OnSitesController(IGenericRepository<WhoInSite> repo, IMapper mapper) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<WhoInSite>>> GetWhoIsOnSites()
        {
            return Ok(await repo.GetAllAsync());
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<WhoInSite>> GetWhoIsOnSite(int id)
        {
            var whoInSite = await repo.GetByIdAsync(id);

            if (whoInSite == null) return NotFound();

            return Ok(whoInSite);
        }

        [HttpPost]
        public async Task<ActionResult<WhoInSite>> CreateWhoIsInSite(OnSiteRequest request)
        {

            var whoInSite = mapper.Map<WhoInSite>(request);
            await repo.AddAsync(whoInSite);


            return CreatedAtAction("GetWhoIsOnSites", new { id = whoInSite.Id });


        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateWhoIsOnSite(int id, OnSiteRequest request)
        {
            var existingOnSite = await repo.GetByIdAsync(id);

            if (existingOnSite == null)
            {
                return NotFound($"onSite with ID {id} not found");
            }

            mapper.Map(request, existingOnSite);

            await repo.UpdateAsync(existingOnSite);


            return NoContent();


        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteWhoIsOnSite(int id)
        {
            var whoInSite = await repo.GetByIdAsync(id);
            if (whoInSite == null) return NotFound();

            await repo.DeleteAsync(whoInSite);

            return NoContent();

        }
    }
}
