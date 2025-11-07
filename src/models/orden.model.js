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
    required: [true, "El peso es obligatorio"],
  },
  costo: {
    type: Number,
    default: 0,
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

// Cálculo automático del costo logístico 
orderSchema.pre("save", function (next) {
  const tarifas = {
    "Buenos Aires": 10000,
    "Catamarca": 8600,
    "Chaco": 8700,
    "Chubut": 9500,
    "Córdoba": 9000,
    "Corrientes": 8800,
    "Entre Ríos": 8900,
    "Formosa": 9000,
    "Jujuy": 9200,
    "La Pampa": 8800,
    "La Rioja": 8500,
    "Mendoza": 9400,
    "Misiones": 9700,
    "Neuquén": 9400,
    "Río Negro": 9300,
    "Salta": 9200,
    "San Juan": 9100,
    "San Luis": 9000,
    "Santa Cruz": 10200,
    "Santa Fe": 8800,
    "Santiago del Estero": 9100,
    "Tierra del Fuego": 11000,
    "Tucumán": 8700
  };


  const destinoNormalizado =
    this.destino.charAt(0).toUpperCase() + this.destino.slice(1).toLowerCase();

  const base = tarifas[destinoNormalizado] || 10000;
  const peso = parseFloat(this.peso) || 1;
  const costoPeso = peso * 600;

  this.costo = base + costoPeso;
  next();
});

export default mongoose.model("Order", orderSchema);
