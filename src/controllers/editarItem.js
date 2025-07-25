const Item = require("../models/Item");

// PUT /items/:id → Editar un artículo por ID (vinculado a una lista)
const editarItem = async (req, res) => {
  const { id } = req.params;
  const { nombre, cantidad, comprado, listaId } = req.body;

  try {
    const item = await Item.findOne({ _id: id, lista: listaId });

    if (!item) {
      return res.status(404).json({ message: "Artículo no encontrado en esa lista" });
    }

    if (nombre !== undefined && item.nombre !== nombre.trim().toLowerCase()) {
      item.nombre = nombre.trim().toLowerCase();
    }

    if (cantidad !== undefined && item.cantidad !== cantidad) {
      item.cantidad = cantidad;
    }

    if (comprado !== undefined && item.comprado !== comprado) {
      item.comprado = comprado;
    }

    const itemActualizado = await item.save();

    // Emitir evento en tiempo real
    req.io.emit("itemUpdated", itemActualizado);

    res.json(itemActualizado);
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

module.exports = editarItem;
