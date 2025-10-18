import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import ordenRoutes from "./routes/orden.routes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/ordenes", ordenRoutes);

// Conexion a MongoDB
connectDB();

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API Logística funcionando Wui");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

export default app;