import { ContratistaFormData, TrabajadorFormData } from "./types";

// Ajusta esta URL a donde corra tu API de C# (.NET)
const API_BASE_URL = "https://localhost:7000/api";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const texto = await res.text();
    throw new Error(`Error ${res.status}: ${texto || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function crearContratista(
  data: ContratistaFormData
): Promise<ContratistaFormData> {
  const res = await fetch(`${API_BASE_URL}/contratistas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<ContratistaFormData>(res);
}

export async function crearTrabajador(
  data: TrabajadorFormData
): Promise<TrabajadorFormData> {
  const res = await fetch(`${API_BASE_URL}/trabajadores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<TrabajadorFormData>(res);
}

export async function obtenerContratistas(): Promise<ContratistaFormData[]> {
  const res = await fetch(`${API_BASE_URL}/contratistas`);
  return handleResponse<ContratistaFormData[]>(res);
}
