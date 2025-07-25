const Item = require("../models/Item");

// DELETE /items/:id → Eliminar un artículo por ID (vinculado a una lista)
const eliminarItem = async (req, res) => {
  const { id } = req.params;
  const { listaId } = req.body;

  try {
    const item = await Item.findOneAndDelete({ _id: id, lista: listaId });

    if (!item) {
      return res.status(404).json({ message: "Artículo no encontrado en esa lista" });
    }

    // Emitir evento en tiempo real
    req.io.emit("itemDeleted", { id, lista: listaId });

    res.json({ message: "Artículo eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

module.exports = eliminarItem;
