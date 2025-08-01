const express = require("express");
const {
  createItem,
  marcarItemComoComprado
} = require("../controllers/itemController");

const editarItem = require("../controllers/editarItem");
const eliminarItem = require("../controllers/eliminarItem");

const router = express.Router();

// POST /api/items/crear → Crear un artículo
router.post("/items/crear", createItem);

// PUT /api/items/editar/:id → Editar un artículo por ID
router.put("/items/editar/:id", editarItem);

// PUT /api/items/comprar/:id → Marcar como comprado
router.put("/items/comprar/:id", marcarItemComoComprado);

// DELETE /api/items/eliminar/:id → Eliminar un artículo por ID
router.delete("/items/eliminar/:id", eliminarItem);

module.exports = router;
