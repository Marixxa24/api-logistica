import Order from "../models/orden.model.js";

// Crear una orden
export const crearOrden = async (req, res) => {
  try {
    const { destino, contenido, estado, costo } = req.body;

    // Si no se envía costo, calculamos uno básico según destino
    const calcularCosto = (destino) => {
      switch (destino?.toLowerCase()) {
        case "buenos aires":
          return 5000;
        case "cordoba":
          return 4000;
        case "la rioja":
          return 3500;
        case "catamarca":
          return 3000;
        default:
          return 2500;
      }
    };

    const nuevaOrden = new Order({
      destino,
      contenido,
      estado,
      costo: costo || calcularCosto(destino),
    });

    await nuevaOrden.save();
    res.status(201).json(nuevaOrden);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todas las órdenes o filtrar por estado
export const obtenerOrdenes = async (req, res) => {
  try {
    const { estado } = req.query;
    const filtro = estado ? { estado } : {};
    const ordenes = await Order.find(filtro);
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una orden por ID
export const obtenerOrdenPorId = async (req, res) => {
  try {
    const orden = await Order.findById(req.params.id);
    if (!orden) return res.status(404).json({ message: "Orden no encontrada" });
    res.json(orden);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una orden
export const actualizarOrden = async (req, res) => {
  try {
    const orden = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!orden) return res.status(404).json({ message: "Orden no encontrada" });
    res.json(orden);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una orden
export const eliminarOrden = async (req, res) => {
  try {
    const orden = await Order.findByIdAndDelete(req.params.id);
    if (!orden) return res.status(404).json({ message: "Orden no encontrada" });
    res.json({ message: "Orden eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
