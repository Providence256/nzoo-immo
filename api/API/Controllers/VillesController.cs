using API.DTOs.VilleDto;
using Core.Entities;
using Core.Interfaces;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VillesController(
        IGenericRepository<Ville> repo,
        IPhotoService photoService
        ) : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Ville>>> GetVilles()
        {
            var villes = await repo.GetAllAsync();
            return Ok(villes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ville>> GetVille(int id)
        {
            var ville = await repo.GetByIdAsync(id);
            if (ville == null) return NotFound();
            return Ok(ville);
        }

        [HttpPost]
        public async Task<ActionResult<Ville>> CreateVille(VilleRequest request)
        {
            var result = await photoService.AddPhotoAsync(request.Image!);
            if (result.Error != null) return BadRequest(result.Error.Message);

            var createdVille = new Ville
            {
                Code = request.Code,
                Designation = request.Designation,
                Description = request.Description,
                ImageUrl = result.SecureUrl.AbsoluteUri,
            };
            await repo.AddAsync(createdVille);
            return CreatedAtAction(nameof(GetVille), new { id = createdVille.Id }, createdVille);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVille(int id, VilleRequest request)
        {
            var existingVille = await repo.GetByIdAsync(id);

            if (existingVille == null)
            {
                return NotFound($"Ville with ID {id} not found.");
            }

            existingVille.Code = request.Code;
            existingVille.Designation = request.Designation;
            existingVille.Description = request.Description;
            existingVille.UpdatedAt = DateTime.UtcNow;

            if (request.Image != null)
            {
                // Delete the old image if it exists
                await photoService.DeletePhotoAsync(existingVille.ImageUrl!);

                var result = await photoService.AddPhotoAsync(request.Image!);
                if (result.Error != null) return BadRequest(result.Error.Message);

                existingVille.ImageUrl = result.SecureUrl.AbsoluteUri;
            }
            else
            {
                existingVille.ImageUrl = existingVille.ImageUrl;
            }

            await repo.UpdateAsync(existingVille);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVille(int id)
        {
            var ville = await repo.GetByIdAsync(id);
            if (ville == null) return NotFound();

            await repo.DeleteAsync(ville);
            return NoContent();
        }
    }
}
