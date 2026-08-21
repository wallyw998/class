using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ContratistasApi.Data;
using ContratistasApi.Models;

namespace ContratistasApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrabajadoresController : ControllerBase
    {
        private readonly ContratistasDbContext _context;

        public TrabajadoresController(ContratistasDbContext context)
        {
            _context = context;
        }

        // GET: api/trabajadores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Trabajador>>> ObtenerTodos()
        {
            var trabajadores = await _context.Trabajadores
                .Include(t => t.DatosPersonales)
                .ToListAsync();

            return Ok(trabajadores);
        }

        // GET: api/trabajadores/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Trabajador>> ObtenerPorId(int id)
        {
            var trabajador = await _context.Trabajadores
                .Include(t => t.DatosPersonales)
                .FirstOrDefaultAsync(t => t.IdTrabajador == id);

            if (trabajador == null) return NotFound();
            return Ok(trabajador);
        }

        // POST: api/trabajadores
        [HttpPost]
        public async Task<ActionResult<Trabajador>> Crear([FromBody] TrabajadorFormDto formulario)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            // Verifica que el contratista referenciado exista
            var existeContratista = await _context.Contratistas
                .AnyAsync(c => c.IdContratistas == formulario.Trabajador.IdContratista);

            if (!existeContratista)
                return BadRequest($"No existe un contratista con Id {formulario.Trabajador.IdContratista}.");

            using var transaccion = await _context.Database.BeginTransactionAsync();
            try
            {
                var trabajador = formulario.Trabajador;
                _context.Trabajadores.Add(trabajador);
                await _context.SaveChangesAsync(); // genera IdTrabajador

                formulario.DatosPersonales.IdTrabajador = trabajador.IdTrabajador;
                _context.DatosPersonales.Add(formulario.DatosPersonales);

                await _context.SaveChangesAsync();
                await transaccion.CommitAsync();

                return CreatedAtAction(nameof(ObtenerPorId), new { id = trabajador.IdTrabajador }, trabajador);
            }
            catch (Exception ex)
            {
                await transaccion.RollbackAsync();
                return StatusCode(500, $"Error al guardar el trabajador: {ex.Message}");
            }
        }
    }
}
