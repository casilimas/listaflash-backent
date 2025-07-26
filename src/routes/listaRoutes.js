const express = require("express");
const {
  crearLista,
  obtenerUltimaLista,
  editarLista,
} = require("../controllers/listaController");

const listarListaPorNumero = require("../controllers/listarListas");
const listarTodasLasListas = require("../controllers/listarTodasLasListas"); // ✅ nuevo controlador

const router = express.Router();

// Crear una nueva lista
router.post("/listas", crearLista);

// Obtener la última lista creada
router.get("/listas/ultima", obtenerUltimaLista);

// Buscar lista por número y retornar sus items
router.get("/listas/numero/:numero", listarListaPorNumero);

// Obtener todas las listas (nuevo endpoint necesario para frontend)
router.get("/listas/todas", listarTodasLasListas); // ✅ nuevo endpoint

// Editar lista por ID
router.put("/listas/id/:id", editarLista);

module.exports = router;
