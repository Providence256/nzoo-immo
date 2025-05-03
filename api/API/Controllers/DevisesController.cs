using API.DTOs.DeviseDto;
using AutoMapper;
using Core.Entities;
using Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DevisesController(IGenericRepository<Devise> repo, IMapper mapper) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Devise>>> GetDevises()
        {
            return Ok(await repo.GetAllAsync());
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Devise>> GetDevise(int id)
        {
            var devise = await repo.GetByIdAsync(id);

            if (devise == null) return NotFound();

            return devise;
        }

        [HttpGet("reference")]
        public async Task<ActionResult<Devise>> GetDeviseReference()
        {
            var devises = await repo.GetAllAsync();

            var devise = devises.FirstOrDefault(x => x.IsFiscale == true);

            if (devise == null)
            {
                return NotFound();
            }

            return devise;
        }


        [HttpPost]
        public async Task<ActionResult<Devise>> CreateDevise(DeviseRequest request)
        {

            if (request.IsFiscale)
            {
                var existingFiscaleDevise = await repo.GetAllAsync();
                var hasFiscaleDevise = existingFiscaleDevise.Any(x => x.IsFiscale == true);
                if (hasFiscaleDevise)
                {
                    return BadRequest("There is already a fiscal devise. You cannot add another one.");
                }
            }
            var devise = mapper.Map<Devise>(request);

            await repo.AddAsync(devise);


            return CreatedAtAction("GetDevises", new { id = devise.Id });


        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateDevise(int id, DeviseRequest request)
        {
            var existingDevise = await repo.GetByIdAsync(id);

            if (existingDevise == null)
            {
                return NotFound($"Devise with ID {id} not found");
            }

            mapper.Map(request, existingDevise);

            await repo.UpdateAsync(existingDevise);


            return NoContent();



        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteDevise(int id)
        {
            var devise = await repo.GetByIdAsync(id);
            if (devise == null) return NotFound();

            await repo.DeleteAsync(devise);


            return NoContent();


        }



    }

}
