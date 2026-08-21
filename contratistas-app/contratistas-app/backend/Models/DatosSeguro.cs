using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ContratistasApi.Models
{
    // Tabla: Cntr_Datos_Seguro
    public class DatosSeguro
    {
        [Key]
        public int IdDatosSeguro { get; set; }

        [MaxLength(50)]
        public string? RegistroPatronal { get; set; }

        [MaxLength(150)]
        public string? ActividadImss { get; set; }

        [Required, MaxLength(50)]
        public string ClaseRiesgo { get; set; } = string.Empty;

        [Required]
        public int IdContratistas { get; set; }

        [ForeignKey(nameof(IdContratistas))]
        public Contratista? Contratista { get; set; }
    }
}
