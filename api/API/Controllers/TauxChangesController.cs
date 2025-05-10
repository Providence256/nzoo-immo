using API.DTOs.TauxChangeDto;
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
    public class TauxChangesController(IGenericRepository<TauxChange> repo, IMapper mapper) : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<TauxChangeResponse>>> GetTauxChanges()
        {
            var spec = new TauxChangeSpecification();
            var tauxChange = await repo.ListAsync(spec);
            var results = mapper.Map<IReadOnlyList<TauxChange>, IReadOnlyList<TauxChangeResponse>>(tauxChange);
            return Ok(results);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<TauxChangeResponse>> GetTauxChange(int id)
        {
            var tauxChange = await repo.GetByIdAsync(id);

            if (tauxChange == null) return NotFound();

            return Ok(mapper.Map<TauxChangeResponse>(tauxChange));
        }


        [HttpPost]
        public async Task<ActionResult<TauxChangeResponse>> CreateTauxChange(TauxChangeRequest request)
        {
            var taux = mapper.Map<TauxChange>(request);

            await repo.AddAsync(taux);


            var result = mapper.Map<TauxChangeResponse>(taux);
            return CreatedAtAction(nameof(GetTauxChange), new { id = taux.Id }, result);


        }


        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateTauxChange(int id, TauxChangeRequest request)
        {
            var existingTaux = await repo.GetByIdAsync(id);

            if (existingTaux == null)
            {
                return NotFound($"Exchange rate with ID {id} not found");
            }

            mapper.Map(request, existingTaux);

            await repo.UpdateAsync(existingTaux);


            return NoContent();

        }


        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteTauxChange(int id)
        {
            var taux = await repo.GetByIdAsync(id);

            if (taux == null) return NotFound();

            await repo.DeleteAsync(taux);


            return NoContent();

        }

    }
}
