using Microsoft.EntityFrameworkCore;
using ContratistasApi.Models;

namespace ContratistasApi.Data
{
    public class ContratistasDbContext : DbContext
    {
        public ContratistasDbContext(DbContextOptions<ContratistasDbContext> options)
            : base(options) { }

        public DbSet<Contratista> Contratistas => Set<Contratista>();
        public DbSet<DatosContables> DatosContables => Set<DatosContables>();
        public DbSet<DatosSeguro> DatosSeguro => Set<DatosSeguro>();
        public DbSet<Actividades> Actividades => Set<Actividades>();
        public DbSet<Trabajador> Trabajadores => Set<Trabajador>();
        public DbSet<DatosPersonales> DatosPersonales => Set<DatosPersonales>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Nombres de tabla exactos (igual que en el script SQL)
            modelBuilder.Entity<Contratista>().ToTable("Cntr_Datos");
            modelBuilder.Entity<DatosContables>().ToTable("Cntr_Datos_Contables");
            modelBuilder.Entity<DatosSeguro>().ToTable("Cntr_Datos_Seguro");
            modelBuilder.Entity<Actividades>().ToTable("Cntr_Actividades");
            modelBuilder.Entity<Trabajador>().ToTable("Cntr_Trabajador");
            modelBuilder.Entity<DatosPersonales>().ToTable("Cntr_Datos_Per");

            // Relaciones 1 a 1 (mismo IdContratistas por contratista)
            modelBuilder.Entity<Contratista>()
                .HasOne(c => c.DatosContables)
                .WithOne(d => d.Contratista)
                .HasForeignKey<DatosContables>(d => d.IdContratistas);

            modelBuilder.Entity<Contratista>()
                .HasOne(c => c.DatosSeguro)
                .WithOne(s => s.Contratista)
                .HasForeignKey<DatosSeguro>(s => s.IdContratistas);

            modelBuilder.Entity<Contratista>()
                .HasOne(c => c.Actividades)
                .WithOne(a => a.Contratista)
                .HasForeignKey<Actividades>(a => a.IdContratistas);

            modelBuilder.Entity<Trabajador>()
                .HasOne(t => t.DatosPersonales)
                .WithOne(d => d.TrabajadorRef)
                .HasForeignKey<DatosPersonales>(d => d.IdTrabajador);
        }
    }
}
