using API.DTOs.CommuneDto;
using AutoMapper;
using Core.Entities;
using Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommunesController(IGenericRepository<Commune> repo, IMapper mapper) : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Commune>>> GetCommunes()
        {
            return Ok(await repo.GetAllAsync());
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Commune>> GetCommune(int id)
        {
            var commune = await repo.GetByIdAsync(id);

            if (commune == null) return NotFound();

            return commune;
        }

        [HttpPost]
        public async Task<ActionResult<Commune>> CreateCommune(CommuneRequest communeRequest)
        {
            var commune = mapper.Map<Commune>(communeRequest);

            await repo.AddAsync(commune);

            return CreatedAtAction("GetCommunes", new { id = commune.Id });

        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateCommune(int id, CommuneRequest request)
        {
            var existingCommune = await repo.GetByIdAsync(id);
            if (existingCommune == null)
            {
                return NotFound($"Commune with ID {id} not found.");
            }
            mapper.Map(request, existingCommune);
            await repo.UpdateAsync(existingCommune);


            return NoContent();

        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteCommune(int id)
        {
            var commune = await repo.GetByIdAsync(id);
            if (commune == null) return NotFound();

            await repo.DeleteAsync(commune);

            return NoContent();

        }


    }
}
