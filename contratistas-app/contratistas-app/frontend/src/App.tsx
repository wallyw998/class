import React, { useState } from "react";
import ContratistaForm from "./ContratistaForm";
import TrabajadorForm from "./TrabajadorForm";

type Vista = "contratista" | "trabajador";

export default function App() {
  const [vista, setVista] = useState<Vista>("contratista");

  return (
    <div>
      <header style={{ display: "flex", gap: 12, padding: 16, borderBottom: "1px solid #eee" }}>
        <button onClick={() => setVista("contratista")}>Contratistas</button>
        <button onClick={() => setVista("trabajador")}>Trabajadores</button>
      </header>
      {vista === "contratista" ? <ContratistaForm /> : <TrabajadorForm />}
    </div>
  );
}
