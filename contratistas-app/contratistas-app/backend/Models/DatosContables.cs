using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ContratistasApi.Models
{
    // Tabla: Cntr_Datos_Contables
    public class DatosContables
    {
        [Key]
        public int IdDatosContables { get; set; }

        [MaxLength(150)]
        public string? RazonSocial { get; set; }

        [MaxLength(13)]
        public string? RFC { get; set; }

        [MaxLength(250)]
        public string? DomicilioFiscal { get; set; }

        [Required]
        [Column(TypeName = "decimal(5,2)")]
        public decimal PrimaRiesgo { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? CapitalContable { get; set; }

        [Required]
        public int IdContratistas { get; set; }

        [ForeignKey(nameof(IdContratistas))]
        public Contratista? Contratista { get; set; }
    }
}
