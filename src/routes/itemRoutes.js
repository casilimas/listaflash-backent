const express = require("express");
const { createItem } = require("../controllers/itemController");
const editarItem = require("../controllers/editarItem");
const eliminarItem = require("../controllers/eliminarItem"); 

const router = express.Router();

// POST /items/crear → Crear un artículo
router.post("/items/crear", createItem);

// PUT /items/editar/:id → Editar un artículo por ID
router.put("/items/editar/:id", editarItem);

// DELETE /items/eliminar/:id → Eliminar un artículo por ID
router.delete("/items/eliminar/:id", eliminarItem);

module.exports = router;
