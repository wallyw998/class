using System.ComponentModel.DataAnnotations;

namespace ContratistasApi.Models
{
    // Tabla: Cntr_Datos
    public class Contratista
    {
        [Key]
        public int IdContratistas { get; set; }

        [Required, MaxLength(150)]
        public string NombreComercial { get; set; } = string.Empty;

        [Required, MaxLength(150)]
        public string CamaraPatronal { get; set; } = string.Empty;

        [Required, MaxLength(150)]
        public string ActividadScian { get; set; } = string.Empty;

        [MaxLength(250)]
        public string? Domicilio { get; set; }

        [Required, MaxLength(100)]
        public string TipoEstablecimiento { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? Nombre { get; set; }

        [MaxLength(100)]
        public string? Apellido { get; set; }

        [MaxLength(20)]
        public string? Telefono { get; set; }

        [MaxLength(150), EmailAddress]
        public string? Correo { get; set; }

        public int? PersonalRegistrado { get; set; }

        [Required, MaxLength(150)]
        public string SolicitantesKCM { get; set; } = string.Empty;

        // Relaciones (1 a 1 a nivel de negocio, aunque la FK permite 1 a muchos)
        public DatosContables? DatosContables { get; set; }
        public DatosSeguro? DatosSeguro { get; set; }
        public Actividades? Actividades { get; set; }
    }
}
