# Formulario Web de Contratistas

Proyecto full-stack basado en las 6 tablas de `Cntr_*`, usando el stack solicitado:
**TSX + TypeScript + JavaScript (frontend con React)** y **C# (backend con ASP.NET Core + Entity Framework Core)**.

## Estructura

```
contratistas-app/
├── frontend/                  # React + TSX + TypeScript
│   ├── src/
│   │   ├── types.ts           # Interfaces que reflejan las tablas SQL
│   │   ├── api.ts             # Llamadas fetch a la API en C#
│   │   ├── ContratistaForm.tsx # Formulario: Cntr_Datos, Cntr_Datos_Contables,
│   │   │                       #             Cntr_Datos_Seguro, Cntr_Actividades
│   │   ├── TrabajadorForm.tsx # Formulario: Cntr_Trabajador, Cntr_Datos_Per
│   │   ├── App.tsx            # Navegación entre ambos formularios
│   │   └── index.tsx          # Punto de entrada
│   └── package.json
│
└── backend/                   # C# / ASP.NET Core Web API
    ├── Models/                # Una clase por tabla + DTOs de formulario
    ├── Data/ContratistasDbContext.cs  # Entity Framework Core
    ├── Controllers/
    │   ├── ContratistasController.cs  # POST guarda las 4 tablas en 1 transacción
    │   └── TrabajadoresController.cs  # POST guarda las 2 tablas en 1 transacción
    ├── Program.cs
    ├── appsettings.json        # Cadena de conexión a SQL Server
    └── ContratistasApi.csproj
```

## Cómo correrlo

### Backend (C#)
1. Ajusta la cadena de conexión en `backend/appsettings.json` con tu servidor de SQL Server
   (la misma base de datos donde ejecutaste los scripts de las 6 tablas).
2. Desde la carpeta `backend/`:
   ```
   dotnet restore
   dotnet run
   ```
3. La API queda disponible en `https://localhost:7000/api/...` (ajusta el puerto si es distinto)
   y puedes ver la documentación interactiva en `/swagger`.

### Frontend (TSX/TypeScript)
1. Desde la carpeta `frontend/`:
   ```
   npm install
   npm run dev
   ```
2. Abre la URL que indique Vite (normalmente `http://localhost:5173`).
3. Si tu API corre en otro puerto, actualiza `API_BASE_URL` en `frontend/src/api.ts`.

## Notas
- Cada formulario valida los campos obligatorios antes de enviarlos.
- El backend guarda los datos relacionados dentro de una transacción: si algo falla,
  no se guarda nada a medias.
- Los nombres de tabla en `ContratistasDbContext` están mapeados exactamente
  como en los scripts SQL (`Cntr_Datos`, `Cntr_Datos_Contables`, etc.), así que
  puedes usar el mismo script que ya generamos sin cambiar nada.
