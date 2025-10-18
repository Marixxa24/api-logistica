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

export default mongoose.model("Order", orderSchema);