using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ContratistasApi.Data;
using ContratistasApi.Models;

namespace ContratistasApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContratistasController : ControllerBase
    {
        private readonly ContratistasDbContext _context;

        public ContratistasController(ContratistasDbContext context)
        {
            _context = context;
        }

        // GET: api/contratistas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contratista>>> ObtenerTodos()
        {
            var contratistas = await _context.Contratistas
                .Include(c => c.DatosContables)
                .Include(c => c.DatosSeguro)
                .Include(c => c.Actividades)
                .ToListAsync();

            return Ok(contratistas);
        }

        // GET: api/contratistas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Contratista>> ObtenerPorId(int id)
        {
            var contratista = await _context.Contratistas
                .Include(c => c.DatosContables)
                .Include(c => c.DatosSeguro)
                .Include(c => c.Actividades)
                .FirstOrDefaultAsync(c => c.IdContratistas == id);

            if (contratista == null) return NotFound();
            return Ok(contratista);
        }

        // POST: api/contratistas
        // Recibe el formulario completo (4 tablas) y lo guarda en una sola transacción
        [HttpPost]
        public async Task<ActionResult<Contratista>> Crear([FromBody] ContratistaFormDto formulario)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            using var transaccion = await _context.Database.BeginTransactionAsync();
            try
            {
                var contratista = formulario.Datos;
                _context.Contratistas.Add(contratista);
                await _context.SaveChangesAsync(); // genera IdContratistas

                formulario.Contables.IdContratistas = contratista.IdContratistas;
                formulario.Seguro.IdContratistas = contratista.IdContratistas;
                formulario.Actividades.IdContratistas = contratista.IdContratistas;

                _context.DatosContables.Add(formulario.Contables);
                _context.DatosSeguro.Add(formulario.Seguro);
                _context.Actividades.Add(formulario.Actividades);

                await _context.SaveChangesAsync();
                await transaccion.CommitAsync();

                return CreatedAtAction(nameof(ObtenerPorId), new { id = contratista.IdContratistas }, contratista);
            }
            catch (Exception ex)
            {
                await transaccion.RollbackAsync();
                return StatusCode(500, $"Error al guardar el contratista: {ex.Message}");
            }
        }
    }
}
