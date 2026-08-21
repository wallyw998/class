import React, { useState } from "react";
import {
  ContratistaFormData,
  DatosContratista,
  DatosContables,
  DatosSeguro,
  Actividades,
} from "./types";
import { crearContratista } from "./api";

const datosVacios: DatosContratista = {
  nombreComercial: "",
  camaraPatronal: "",
  actividadScian: "",
  domicilio: "",
  tipoEstablecimiento: "",
  nombre: "",
  apellido: "",
  telefono: "",
  correo: "",
  personalRegistrado: "",
  solicitantesKCM: "",
};

const contablesVacios: DatosContables = {
  razonSocial: "",
  rfc: "",
  domicilioFiscal: "",
  primaRiesgo: "",
  capitalContable: "",
};

const seguroVacio: DatosSeguro = {
  registroPatronal: "",
  actividadImss: "",
  claseRiesgo: "",
};

const actividadesVacias: Actividades = {
  accesoPlanta: "",
  dimensionesCons: "",
  actividades: "",
  areaTrabajo: "",
  actividadesEnPlanta: "",
  diasLaborados: "",
};

type Seccion = "datos" | "contables" | "seguro" | "actividades";

export default function ContratistaForm() {
  const [datos, setDatos] = useState<DatosContratista>(datosVacios);
  const [contables, setContables] = useState<DatosContables>(contablesVacios);
  const [seguro, setSeguro] = useState<DatosSeguro>(seguroVacio);
  const [actividades, setActividades] = useState<Actividades>(actividadesVacias);

  const [seccionActiva, setSeccionActiva] = useState<Seccion>("datos");
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: "ok" | "error"; texto: string } | null>(null);

  function actualizarCampo<T>(
    setter: React.Dispatch<React.SetStateAction<T>>
  ) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      setter((prev) => ({
        ...prev,
        [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
      }));
    };
  }

  const camposObligatorios: Array<keyof DatosContratista> = [
    "nombreComercial",
    "camaraPatronal",
    "actividadScian",
    "tipoEstablecimiento",
    "solicitantesKCM",
  ];

  function validar(): string | null {
    for (const campo of camposObligatorios) {
      if (!datos[campo]) return `El campo "${campo}" es obligatorio.`;
    }
    if (!contables.primaRiesgo && contables.primaRiesgo !== 0)
      return "El campo Prima de Riesgo es obligatorio.";
    if (!seguro.claseRiesgo) return "El campo Clase de Riesgo es obligatorio.";
    return null;
  }

  async function manejarEnvio(e: React.FormEvent) {
    e.preventDefault();
    setMensaje(null);

    const error = validar();
    if (error) {
      setMensaje({ tipo: "error", texto: error });
      return;
    }

    const payload: ContratistaFormData = { datos, contables, seguro, actividades };

    try {
      setEnviando(true);
      await crearContratista(payload);
      setMensaje({ tipo: "ok", texto: "Contratista registrado correctamente." });
      setDatos(datosVacios);
      setContables(contablesVacios);
      setSeguro(seguroVacio);
      setActividades(actividadesVacias);
      setSeccionActiva("datos");
    } catch (err) {
      setMensaje({
        tipo: "error",
        texto: err instanceof Error ? err.message : "Error al enviar el formulario.",
      });
    } finally {
      setEnviando(false);
    }
  }

  const secciones: { id: Seccion; etiqueta: string }[] = [
    { id: "datos", etiqueta: "1. Datos Generales" },
    { id: "contables", etiqueta: "2. Datos Contables" },
    { id: "seguro", etiqueta: "3. Datos de Seguro" },
    { id: "actividades", etiqueta: "4. Actividades" },
  ];

  return (
    <div style={estilos.contenedor}>
      <h1 style={estilos.titulo}>Registro de Contratista</h1>

      <nav style={estilos.tabs}>
        {secciones.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSeccionActiva(s.id)}
            style={{
              ...estilos.tabBoton,
              ...(seccionActiva === s.id ? estilos.tabBotonActivo : {}),
            }}
          >
            {s.etiqueta}
          </button>
        ))}
      </nav>

      <form onSubmit={manejarEnvio} style={estilos.formulario}>
        {seccionActiva === "datos" && (
          <fieldset style={estilos.fieldset}>
            <legend>Datos Generales (Cntr_Datos)</legend>
            <Campo label="Nombre comercial *" name="nombreComercial" value={datos.nombreComercial} onChange={actualizarCampo(setDatos)} />
            <Campo label="Cámara patronal *" name="camaraPatronal" value={datos.camaraPatronal} onChange={actualizarCampo(setDatos)} />
            <Campo label="Actividad SCIAN *" name="actividadScian" value={datos.actividadScian} onChange={actualizarCampo(setDatos)} />
            <Campo label="Domicilio" name="domicilio" value={datos.domicilio} onChange={actualizarCampo(setDatos)} />
            <Campo label="Tipo de establecimiento *" name="tipoEstablecimiento" value={datos.tipoEstablecimiento} onChange={actualizarCampo(setDatos)} />
            <Campo label="Nombre (contacto)" name="nombre" value={datos.nombre} onChange={actualizarCampo(setDatos)} />
            <Campo label="Apellido (contacto)" name="apellido" value={datos.apellido} onChange={actualizarCampo(setDatos)} />
            <Campo label="Teléfono" name="telefono" value={datos.telefono} onChange={actualizarCampo(setDatos)} />
            <Campo label="Correo" name="correo" type="email" value={datos.correo} onChange={actualizarCampo(setDatos)} />
            <Campo label="Personal registrado" name="personalRegistrado" type="number" value={datos.personalRegistrado} onChange={actualizarCampo(setDatos)} />
            <Campo label="Solicitantes KCM *" name="solicitantesKCM" value={datos.solicitantesKCM} onChange={actualizarCampo(setDatos)} />
          </fieldset>
        )}

        {seccionActiva === "contables" && (
          <fieldset style={estilos.fieldset}>
            <legend>Datos Contables (Cntr_Datos_Contables)</legend>
            <Campo label="Razón social" name="razonSocial" value={contables.razonSocial} onChange={actualizarCampo(setContables)} />
            <Campo label="RFC" name="rfc" value={contables.rfc} onChange={actualizarCampo(setContables)} maxLength={13} />
            <Campo label="Domicilio fiscal" name="domicilioFiscal" value={contables.domicilioFiscal} onChange={actualizarCampo(setContables)} />
            <Campo label="Prima de riesgo *" name="primaRiesgo" type="number" step="0.01" value={contables.primaRiesgo} onChange={actualizarCampo(setContables)} />
            <Campo label="Capital contable" name="capitalContable" type="number" step="0.01" value={contables.capitalContable} onChange={actualizarCampo(setContables)} />
          </fieldset>
        )}

        {seccionActiva === "seguro" && (
          <fieldset style={estilos.fieldset}>
            <legend>Datos de Seguro (Cntr_Datos_Seguro)</legend>
            <Campo label="Registro patronal" name="registroPatronal" value={seguro.registroPatronal} onChange={actualizarCampo(setSeguro)} />
            <Campo label="Actividad IMSS" name="actividadImss" value={seguro.actividadImss} onChange={actualizarCampo(setSeguro)} />
            <Campo label="Clase de riesgo *" name="claseRiesgo" value={seguro.claseRiesgo} onChange={actualizarCampo(setSeguro)} />
          </fieldset>
        )}

        {seccionActiva === "actividades" && (
          <fieldset style={estilos.fieldset}>
            <legend>Actividades (Cntr_Actividades)</legend>
            <Campo label="Acceso a planta" name="accesoPlanta" value={actividades.accesoPlanta} onChange={actualizarCampo(setActividades)} />
            <Campo label="Dimensiones de construcción" name="dimensionesCons" value={actividades.dimensionesCons} onChange={actualizarCampo(setActividades)} />
            <Campo label="Actividades" name="actividades" value={actividades.actividades} onChange={actualizarCampo(setActividades)} />
            <Campo label="Área de trabajo" name="areaTrabajo" value={actividades.areaTrabajo} onChange={actualizarCampo(setActividades)} />
            <Campo label="Actividades en planta" name="actividadesEnPlanta" value={actividades.actividadesEnPlanta} onChange={actualizarCampo(setActividades)} />
            <Campo label="Días laborados" name="diasLaborados" value={actividades.diasLaborados} onChange={actualizarCampo(setActividades)} />
          </fieldset>
        )}

        {mensaje && (
          <p style={mensaje.tipo === "ok" ? estilos.mensajeOk : estilos.mensajeError}>
            {mensaje.texto}
          </p>
        )}

        <div style={estilos.acciones}>
          <button type="submit" disabled={enviando} style={estilos.botonEnviar}>
            {enviando ? "Guardando..." : "Guardar contratista"}
          </button>
        </div>
      </form>
    </div>
  );
}

// ---------------------------------------------------------
// Componente reutilizable de campo de texto/número
// ---------------------------------------------------------
interface CampoProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  step?: string;
  maxLength?: number;
}

function Campo({ label, name, value, onChange, type = "text", step, maxLength }: CampoProps) {
  return (
    <div style={estilos.campoContenedor}>
      <label style={estilos.etiqueta} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        step={step}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        style={estilos.input}
      />
    </div>
  );
}

// ---------------------------------------------------------
// Estilos en línea (sin dependencias externas)
// ---------------------------------------------------------
const estilos: Record<string, React.CSSProperties> = {
  contenedor: { maxWidth: 720, margin: "0 auto", padding: 24, fontFamily: "system-ui, sans-serif" },
  titulo: { fontSize: 24, marginBottom: 16 },
  tabs: { display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" },
  tabBoton: { padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6, background: "#f5f5f5", cursor: "pointer" },
  tabBotonActivo: { background: "#2563eb", color: "#fff", borderColor: "#2563eb" },
  formulario: { display: "flex", flexDirection: "column", gap: 16 },
  fieldset: { border: "1px solid #ddd", borderRadius: 8, padding: 16 },
  campoContenedor: { display: "flex", flexDirection: "column", marginBottom: 12 },
  etiqueta: { fontSize: 14, marginBottom: 4, fontWeight: 600 },
  input: { padding: 8, borderRadius: 6, border: "1px solid #ccc", fontSize: 14 },
  acciones: { display: "flex", justifyContent: "flex-end" },
  botonEnviar: { padding: "10px 20px", background: "#16a34a", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 15 },
  mensajeOk: { color: "#16a34a", fontWeight: 600 },
  mensajeError: { color: "#dc2626", fontWeight: 600 },
};
