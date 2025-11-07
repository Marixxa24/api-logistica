import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  destino: {
    type: String,
    required: [true, "El destino es obligatorio"],
    trim: true,
  },
  contenido: {
    type: String,
    required: [true, "El contenido es obligatorio"],
    trim: true,
  },
  peso: {
    type: Number,
    required: [true, "El peso del paquete es obligatorio"],
    min: [0.1, "El peso debe ser mayor a 0 kg"],
    default: 1,
  },
  costo: {
    type: Number,
    required: [true, "El costo logístico es obligatorio"],
    default: 1500, // base mínima
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
  estado: {
    type: String,
    required: true,
    enum: {
      values: ["Pendiente", "En tránsito", "Entregado"],
      message: "El estado debe ser: Pendiente, En tránsito o Entregado",
    },
    default: "Pendiente",
  },
});

// 🧮 Middleware para calcular el costo antes de guardar
orderSchema.pre("save", function (next) {
  if (!this.isModified("destino") && !this.isModified("peso") && this.costo) {
    return next();
  }

  let distancia = 100; // default
  const destinoLower = this.destino.toLowerCase();

  if (destinoLower.includes("buenos aires")) distancia = 900;
  else if (destinoLower.includes("cordoba")) distancia = 600;
  else if (destinoLower.includes("la rioja")) distancia = 400;
  else if (destinoLower.includes("catamarca")) distancia = 500;
  else if (destinoLower.includes("rosario")) distancia = 800;

  const base = 1500;
  this.costo = base + distancia * 50 + this.peso * 100;
  next();
});

export default mongoose.model("Order", orderSchema);
