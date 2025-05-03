using API.DTOs.TypehebergementDto;
using AutoMapper;
using Core.Entities;
using Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypeHebergementsController(IGenericRepository<TypeHebergement> repo, IMapper mapper) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<TypeHebergement>>> GetTypehebergements()
        {
            return Ok(await repo.GetAllAsync());
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<TypeHebergement>> GetTypeHebergement(int id)
        {
            var type = await repo.GetByIdAsync(id);

            if (type == null) return NotFound();

            return type;
        }

        [HttpPost]
        public async Task<ActionResult<TypeHebergement>> CreateTypeHebergement(TypeHebergement type)
        {
            await repo.AddAsync(type);


            return CreatedAtAction("GetTypehebergements", new { id = type.Id });


        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateTypeHebergement(int id, TypeHebergementRequest request)
        {
            var existingType = await repo.GetByIdAsync(id);
            if (existingType == null)
            {
                return NotFound($"TypeHebergement with ID {id} not found.");
            }

            // Map the request to the existing entity (keeps the existing ID)
            mapper.Map(request, existingType);

            await repo.UpdateAsync(existingType);


            return NoContent();


        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteType(int id)
        {
            var type = await repo.GetByIdAsync(id);
            if (type == null) return NotFound();

            await repo.DeleteAsync(type);


            return NoContent();

        }

    }
}
