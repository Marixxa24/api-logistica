# API Logística 

API REST para gestión de órdenes de logística desarrollada con Node.js, Express y MongoDB.

**Integrador MERN Stack - Pilar Tecno 2025**

---

## Deploy

**URL:** [ https://api-logistica-chi.vercel.app]

---

##  Instalación
```bash
# Clonar repositorio
git clone https://github.com/Marixxa24/api-logistica.git
cd api-logistica

# Instalar dependencias
npm install

# Configurar .env
MONGO_URI=conexion_mongodb
PORT=3000

# Ejecutar
npm run dev
```

---

## Endpoints

**Base URL:** `/api/ordenes`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Listar todas las órdenes |
| GET | `?estado=Pendiente` | Filtrar por estado |
| GET | `/:id` | Obtener por ID |
| POST | `/` | Crear orden |
| PUT | `/:id` | Actualizar orden |
| DELETE | `/:id` | Eliminar orden |

---

## 🛠️ Tecnologías

- Node.js
- Express
- MongoDB
- Mongoose

---

## 📂 Estructura
```
/api-logistica
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── order.controller.js
│   ├── models/
│   │   └── orden.model.js
│   ├── routes/
│   │   └── orden.routes.js
│   └── app.js                    
│
├── node_modules/
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── vercel.json                   