const express = require("express");
const {
  crearLista,
  obtenerUltimaLista,
  editarLista,
} = require("../controllers/listaController");

const listarListaPorNumero = require("../controllers/listarListas");

const router = express.Router();

// Crear una nueva lista
router.post("/listas", crearLista);

// Obtener la última lista creada
router.get("/listas/ultima", obtenerUltimaLista);

// Buscar lista por número y retornar sus items (evita conflicto con ID)
router.get("/listas/numero/:numero", listarListaPorNumero);

// Editar lista por ID (ruta más específica para evitar colisión)
router.put("/listas/id/:id", editarLista);

module.exports = router;
