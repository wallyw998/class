import React, { useState } from "react";
import { Trabajador, DatosPersonales, TrabajadorFormData } from "./types";
import { crearTrabajador } from "./api";

const trabajadorVacio: Trabajador = {
  nombre: "",
  apellidoP: "",
  apellidoM: "",
  cargo: "",
  actividad: "",
  idContratista: "",
};

const datosPersonalesVacios: DatosPersonales = {
  numImss: "",
  direccion: "",
  curp: "",
  telefono: "",
};

export default function TrabajadorForm() {
  const [trabajador, setTrabajador] = useState<Trabajador>(trabajadorVacio);
  const [datosPersonales, setDatosPersonales] = useState<DatosPersonales>(datosPersonalesVacios);
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: "ok" | "error"; texto: string } | null>(null);

  function manejarCambioTrabajador(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type } = e.target;
    setTrabajador((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  }

  function manejarCambioDatosPersonales(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setDatosPersonales((prev) => ({ ...prev, [name]: value }));
  }

  function validar(): string | null {
    if (!trabajador.nombre) return "El nombre es obligatorio.";
    if (!trabajador.apellidoP) return "El apellido paterno es obligatorio.";
    if (!trabajador.idContratista) return "El Id de contratista es obligatorio.";
    if (datosPersonales.curp && datosPersonales.curp.length !== 18)
      return "El CURP debe tener 18 caracteres.";
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

    const payload: TrabajadorFormData = { trabajador, datosPersonales };

    try {
      setEnviando(true);
      await crearTrabajador(payload);
      setMensaje({ tipo: "ok", texto: "Trabajador registrado correctamente." });
      setTrabajador(trabajadorVacio);
      setDatosPersonales(datosPersonalesVacios);
    } catch (err) {
      setMensaje({
        tipo: "error",
        texto: err instanceof Error ? err.message : "Error al enviar el formulario.",
      });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Registro de Trabajador</h1>
      <form onSubmit={manejarEnvio} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <fieldset style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16 }}>
          <legend>Datos del Trabajador (Cntr_Trabajador)</legend>
          <Campo label="Nombre *" name="nombre" value={trabajador.nombre} onChange={manejarCambioTrabajador} />
          <Campo label="Apellido paterno *" name="apellidoP" value={trabajador.apellidoP} onChange={manejarCambioTrabajador} />
          <Campo label="Apellido materno" name="apellidoM" value={trabajador.apellidoM} onChange={manejarCambioTrabajador} />
          <Campo label="Cargo" name="cargo" value={trabajador.cargo} onChange={manejarCambioTrabajador} />
          <Campo label="Actividad" name="actividad" value={trabajador.actividad} onChange={manejarCambioTrabajador} />
          <Campo label="Id Contratista *" name="idContratista" type="number" value={trabajador.idContratista} onChange={manejarCambioTrabajador} />
        </fieldset>

        <fieldset style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16 }}>
          <legend>Datos Personales (Cntr_Datos_Per)</legend>
          <Campo label="Número IMSS" name="numImss" value={datosPersonales.numImss} onChange={manejarCambioDatosPersonales} />
          <Campo label="Dirección" name="direccion" value={datosPersonales.direccion} onChange={manejarCambioDatosPersonales} />
          <Campo label="CURP" name="curp" value={datosPersonales.curp} onChange={manejarCambioDatosPersonales} maxLength={18} />
          <Campo label="Teléfono" name="telefono" value={datosPersonales.telefono} onChange={manejarCambioDatosPersonales} />
        </fieldset>

        {mensaje && (
          <p style={{ color: mensaje.tipo === "ok" ? "#16a34a" : "#dc2626", fontWeight: 600 }}>
            {mensaje.texto}
          </p>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            type="submit"
            disabled={enviando}
            style={{ padding: "10px 20px", background: "#16a34a", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 15 }}
          >
            {enviando ? "Guardando..." : "Guardar trabajador"}
          </button>
        </div>
      </form>
    </div>
  );
}

interface CampoProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  maxLength?: number;
}

function Campo({ label, name, value, onChange, type = "text", maxLength }: CampoProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", marginBottom: 12 }}>
      <label style={{ fontSize: 14, marginBottom: 4, fontWeight: 600 }} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc", fontSize: 14 }}
      />
    </div>
  );
}
