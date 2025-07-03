using API.DTOs.DiscountDto;
using AutoMapper;
using Core.Entities;
using Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscountsController(IGenericRepository<Discount> repo, IMapper mapper) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Discount>>> GetDiscounts()
        {
            return Ok(await repo.GetAllAsync());
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Discount>> GetDiscount(int id)
        {
            var discount = await repo.GetByIdAsync(id);

            if (discount == null) return NotFound();

            return Ok(discount);
        }

        [HttpPost]
        public async Task<ActionResult<Discount>> CreateDiscount(DiscountRequest request)
        {

            var discount = mapper.Map<Discount>(request);
            await repo.AddAsync(discount);


            return CreatedAtAction("GetDiscounts", new { id = discount.Id });


        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateDiscount(int id, DiscountRequest request)
        {
            var existingDiscount = await repo.GetByIdAsync(id);

            if (existingDiscount == null)
            {
                return NotFound($"Discount with ID {id} not found");
            }

            mapper.Map(request, existingDiscount);

            await repo.UpdateAsync(existingDiscount);


            return NoContent();


        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteDiscount(int id)
        {
            var discount = await repo.GetByIdAsync(id);
            if (discount == null) return NotFound();

            await repo.DeleteAsync(discount);

            return NoContent();

        }
    }
}
