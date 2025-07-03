using API.DTOs.SousTypehebergementDto;
using API.DTOs.TypehebergementDto;
using AutoMapper;
using Core.Entities;
using Core.Specification;
using Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SousTypesController(IGenericRepository<SousTypeHebergement> repo,
                    IGenericRepository<TypeHebergement> typeRepo,
                    IGenericRepository<SousTypeByHebergement> sousTypeByHebergementRepo,
                    IMapper mapper) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<SousTypeHebergement>>> GetSousTypeHebergements()
        {
            return Ok(await repo.GetAllAsync());
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<SousTypeHebergement>> GetSousTypeHebergement(int id)
        {
            var sousType = await repo.GetByIdAsync(id);

            if (sousType == null) return NotFound();

            return Ok(sousType);
        }

        [HttpPost]
        public async Task<ActionResult<SousTypeHebergement>> CreateSousTypeHebergement(SousTypeRequest request)
        {
            var sousType = mapper.Map<SousTypeHebergement>(request);

            await repo.AddAsync(sousType);

            return CreatedAtAction("GetSousTypeHebergements", new { id = sousType.Id });
        }

        [HttpGet("soustype-by-type/{typeId:int}")]
        public async Task<ActionResult<List<SousTypeByHebergement>>> GetAllSousTypeByType(int typeId)
        {
            var type = await typeRepo.GetByIdAsync(typeId);
            if (type == null) return NotFound($" type avec Id {typeId} introuvable");

            var spec = new SousTypeByHebergementSpecification(typeId);
            var sousTypes = await sousTypeByHebergementRepo.ListAsync(spec);

            var results = mapper.Map<List<SousTypeResponse>>(sousTypes);

            return Ok(results);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateSousTypeHebergement(int id, SousTypeRequest request)
        {
            var exisitingSousType = await repo.GetByIdAsync(id);

            if (exisitingSousType == null)
            {
                return NotFound($"Sous type with id {id} not found");
            }

            mapper.Map(request, exisitingSousType);

            await repo.UpdateAsync(exisitingSousType);

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteSousTypeHebergement(int id)
        {
            var sousType = await repo.GetByIdAsync(id);

            if (sousType == null) return NotFound();

            await repo.DeleteAsync(sousType);

            return NoContent();
        }
    }
}
