const express = require("express");
const {
  crearLista,
  obtenerUltimaLista,
  editarLista,
} = require("../controllers/listaController");

const listarListaPorNumero = require("../controllers/listarListas");

const router = express.Router();

// Rutas específicas primero
router.post("/listas", crearLista);
router.get("/listas/ultima", obtenerUltimaLista);

// Nueva ruta: buscar lista por número y retornar sus items
router.get("/listas/:numero", listarListaPorNumero);

// Ruta para editar lista por ID (se recomienda que uses /listas/id/:id para evitar colisión si quieres)
router.put("/listas/:id", editarLista);

module.exports = router;
