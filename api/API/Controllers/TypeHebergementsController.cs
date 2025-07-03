using API.DTOs.TypehebergementDto;
using AutoMapper;
using Core.Entities;
using Core.Specification;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypeHebergementsController(IGenericRepository<TypeHebergement> repo, IGenericRepository<SousTypeByHebergement> sousTypeRepo, IMapper mapper) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<TypeHebergementResponse>>> GetTypehebergements()
        {
            var spec = new TypeHebergementSpecification();
            var types = await repo.ListAsync(spec);

            var response = mapper.Map<IReadOnlyList<TypeHebergementResponse>>(types);

            return Ok(response);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<TypeHebergement>> GetTypeHebergement(int id)
        {
            var type = await repo.GetByIdAsync(id);

            if (type == null) return NotFound();

            return type;
        }

        [HttpPost]
        public async Task<ActionResult<TypeHebergement>> CreateTypeHebergement(TypeHebergementRequest request)
        {
            var typeHebergement = new TypeHebergement
            {
                Code = request.Code,
                Designation = request.Designation,
                Icon = request.Icon,

            };

            await repo.AddAsync(typeHebergement);

            var sousTypes = request.SousTypeIds.Select(id => new SousTypeByHebergement
            {
                TypeHebergementId = typeHebergement.Id,
                SousTypeHebergementId = id
            }).ToList();

            foreach (var sousType in sousTypes)
            {
                await sousTypeRepo.AddAsync(sousType);
            }
            return CreatedAtAction("GetTypehebergements", new { id = typeHebergement.Id });


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
