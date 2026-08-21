namespace ContratistasApi.Models
{
    // Agrupa las 4 tablas del formulario de contratista
    public class ContratistaFormDto
    {
        public Contratista Datos { get; set; } = new();
        public DatosContables Contables { get; set; } = new();
        public DatosSeguro Seguro { get; set; } = new();
        public Actividades Actividades { get; set; } = new();
    }

    // Agrupa las 2 tablas del formulario de trabajador
    public class TrabajadorFormDto
    {
        public Trabajador Trabajador { get; set; } = new();
        public DatosPersonales DatosPersonales { get; set; } = new();
    }
}
