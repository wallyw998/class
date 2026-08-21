using System.ComponentModel.DataAnnotations;

namespace ContratistasApi.Models
{
    // Tabla: Cntr_Trabajador
    public class Trabajador
    {
        [Key]
        public int IdTrabajador { get; set; }

        [Required, MaxLength(100)]
        public string Nombre { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string ApellidoP { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? ApellidoM { get; set; }

        [MaxLength(100)]
        public string? Cargo { get; set; }

        [MaxLength(200)]
        public string? Actividad { get; set; }

        [Required]
        public int IdContratista { get; set; }

        public DatosPersonales? DatosPersonales { get; set; }
    }
}
