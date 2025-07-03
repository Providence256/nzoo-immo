using API.DTOs.BathroomTypeDto;
using AutoMapper;
using Core.Entities.Identity;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BathroomTypesController(IGenericRepository<BathroomType> repo, IMapper mapper) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<BathroomType>>> GetBathroomTypes()
        {
            return Ok(await repo.GetAllAsync());
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<BathroomType>> GetBathroomType(int id)
        {
            var bathroomType = await repo.GetByIdAsync(id);

            if (bathroomType == null) return NotFound();

            return Ok(bathroomType);
        }

        [HttpPost]
        public async Task<ActionResult<BathroomType>> CreateBathroomType(BathroomTypeRequest request)
        {

            var bathroomType = mapper.Map<BathroomType>(request);
            await repo.AddAsync(bathroomType);


            return CreatedAtAction("GetBathroomTypes", new { id = bathroomType.Id });


        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateBathroomType(int id, BathroomTypeRequest request)
        {
            var existingType = await repo.GetByIdAsync(id);

            if (existingType == null)
            {
                return NotFound($"Type with ID {id} not found");
            }

            mapper.Map(request, existingType);

            await repo.UpdateAsync(existingType);


            return NoContent();


        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteBathroomType(int id)
        {
            var bathroomType = await repo.GetByIdAsync(id);
            if (bathroomType == null) return NotFound();

            await repo.DeleteAsync(bathroomType);

            return NoContent();

        }
    }
}
