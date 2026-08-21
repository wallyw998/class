import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const contenedor = document.getElementById("root");
if (contenedor) {
  const raiz = ReactDOM.createRoot(contenedor);
  raiz.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
