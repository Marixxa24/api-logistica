import Order from "../models/orden.model.js";

// Crea las  orden
export const crearOrden = async (req, res) => {
  try {
    const nuevaOrden = new Order(req.body);
    await nuevaOrden.save();
    res.status(201).json(nuevaOrden);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todas las órdenes o filtra por estado
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

// Obtener orden por ID
export const obtenerOrdenPorId = async (req, res) => {
  try {
    const orden = await Order.findById(req.params.id);
    if (!orden) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }
    res.json(orden);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualiza orden
export const actualizarOrden = async (req, res) => {
  try {
    const orden = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!orden) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }
    res.json(orden);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Elimina orden
export const eliminarOrden = async (req, res) => {
  try {
    const orden = await Order.findByIdAndDelete(req.params.id);
    if (!orden) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }
    res.json({ message: "Orden eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};