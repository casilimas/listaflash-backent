const Item = require("../models/Item");
const Lista = require("../models/Lista");

// POST /items: Crear un artículo asociado a la última lista
const createItem = async (req, res) => {
  const { nombre, cantidad, listaId } = req.body;

  try {
    if (!nombre || !listaId) {
      return res.status(400).json({ message: "Nombre y listaId son obligatorios" });
    }

    // Verificar si ya existe un artículo con el mismo nombre en esa lista
    const existente = await Item.findOne({
      nombre: nombre.trim().toLowerCase(),
      lista: listaId
    });

    if (existente) {
      return res.status(400).json({ message: "Este artículo ya existe en la lista" });
    }

    const nuevoItem = new Item({
      nombre: nombre.trim().toLowerCase(),
      cantidad: cantidad || 1,
      comprado: false,
      lista: listaId,
    });

    const itemGuardado = await nuevoItem.save();

    // Populate para incluir el número de la lista asociada
    const itemConLista = await Item.findById(itemGuardado._id).populate("lista", "numero");

    // Emitir evento en tiempo real
    req.io?.emit("itemAdded", itemConLista);

    res.status(201).json(itemConLista);
  } catch (err) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

// PUT /items/comprar/:id → Marcar un artículo como comprado
const marcarItemComoComprado = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item no encontrado" });
    }

    item.comprado = true;
    await item.save();

    // Emitir evento si usas sockets
    req.io?.emit("itemComprado", item);

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error al marcar como comprado" });
  }
};

module.exports = {
  createItem,
  marcarItemComoComprado,
};
