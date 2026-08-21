using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ContratistasApi.Models
{
    // Tabla: Cntr_Datos_Per
    public class DatosPersonales
    {
        [Key]
        public int Trabajador { get; set; } // PK autonumérica de la tabla

        [Required]
        public int IdTrabajador { get; set; } // FK hacia Cntr_Trabajador

        [MaxLength(20)]
        public string? NumImss { get; set; }

        [MaxLength(250)]
        public string? Direccion { get; set; }

        [MaxLength(18)]
        public string? CURP { get; set; }

        [MaxLength(20)]
        public string? Telefono { get; set; }

        [ForeignKey(nameof(IdTrabajador))]
        public Trabajador? TrabajadorRef { get; set; }
    }
}
