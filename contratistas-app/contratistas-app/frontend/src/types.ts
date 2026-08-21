// =========================================================
// Tipos TypeScript — reflejan las tablas de SQL Server
// =========================================================

// Tabla: Cntr_Datos
export interface DatosContratista {
  idContratistas?: number;
  nombreComercial: string;
  camaraPatronal: string;
  actividadScian: string;
  domicilio: string;
  tipoEstablecimiento: string;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  personalRegistrado: number | "";
  solicitantesKCM: string;
}

// Tabla: Cntr_Datos_Contables
export interface DatosContables {
  idDatosContables?: number;
  razonSocial: string;
  rfc: string;
  domicilioFiscal: string;
  primaRiesgo: number | "";
  capitalContable: number | "";
  idContratistas?: number;
}

// Tabla: Cntr_Datos_Seguro
export interface DatosSeguro {
  idDatosSeguro?: number;
  registroPatronal: string;
  actividadImss: string;
  claseRiesgo: string;
  idContratistas?: number;
}

// Tabla: Cntr_Actividades
export interface Actividades {
  idActividades?: number;
  accesoPlanta: string;
  dimensionesCons: string;
  actividades: string;
  areaTrabajo: string;
  actividadesEnPlanta: string;
  diasLaborados: string;
  idContratistas?: number;
}

// Formulario completo de contratista (las 4 tablas juntas)
export interface ContratistaFormData {
  datos: DatosContratista;
  contables: DatosContables;
  seguro: DatosSeguro;
  actividades: Actividades;
}

// Tabla: Cntr_Trabajador
export interface Trabajador {
  idTrabajador?: number;
  nombre: string;
  apellidoP: string;
  apellidoM: string;
  cargo: string;
  actividad: string;
  idContratista: number | "";
}

// Tabla: Cntr_Datos_Per
export interface DatosPersonales {
  trabajador?: number;
  idTrabajador?: number;
  numImss: string;
  direccion: string;
  curp: string;
  telefono: string;
}

// Formulario completo de trabajador (2 tablas juntas)
export interface TrabajadorFormData {
  trabajador: Trabajador;
  datosPersonales: DatosPersonales;
}
