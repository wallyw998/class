using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ContratistasApi.Models
{
    // Tabla: Cntr_Actividades
    public class Actividades
    {
        [Key]
        public int IdActividades { get; set; }

        [MaxLength(150)]
        public string? AccesoPlanta { get; set; }

        [MaxLength(150)]
        public string? DimensionesCons { get; set; }

        [MaxLength(250)]
        [Column("Actividades")]
        public string? ActividadesTexto { get; set; } // mapea a la columna "Actividades" de la tabla

        [MaxLength(150)]
        public string? AreaTrabajo { get; set; }

        [MaxLength(250)]
        public string? ActividadesEnPlanta { get; set; }

        [MaxLength(100)]
        public string? DiasLaborados { get; set; }

        [Required]
        public int IdContratistas { get; set; }

        [ForeignKey(nameof(IdContratistas))]
        public Contratista? Contratista { get; set; }
    }
}
