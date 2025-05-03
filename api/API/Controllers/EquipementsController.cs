
using API.DTOs.EquipementDto;
using AutoMapper;
using Core.Entities;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipementsController(IGenericRepository<Equipement> repo, IMapper mapper) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Equipement>>> GetEquipements()
        {
            return Ok(await repo.GetAllAsync());
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Equipement>> GetEquipement(int id)
        {
            var equipement = await repo.GetByIdAsync(id);

            if (equipement == null) return NotFound();

            return equipement;
        }

        [HttpPost]
        public async Task<ActionResult<Equipement>> CreateEquipement(EquipementRequest request)
        {
            var equipemenent = mapper.Map<Equipement>(request);

            await repo.AddAsync(equipemenent);


            return CreatedAtAction("GetEquipements", new { id = equipemenent.Id });


        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateEquipement(int id, EquipementRequest request)
        {
            var existingEquipement = await repo.GetByIdAsync(id);
            if (existingEquipement == null)
            {
                return NotFound($"Equipement with id {id} not found.");
            }

            mapper.Map(request, existingEquipement);

            await repo.UpdateAsync(existingEquipement);


            return NoContent();


        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteEquipement(int id)
        {
            var equipement = await repo.GetByIdAsync(id);
            if (equipement == null) return NotFound();

            await repo.DeleteAsync(equipement);


            return NoContent();


        }

    }
}
