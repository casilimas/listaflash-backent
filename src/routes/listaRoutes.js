const express = require("express");
const {
  crearLista,
  obtenerUltimaLista,
  editarLista,
} = require("../controllers/listaController");

const router = express.Router();

router.post("/listas", crearLista);
router.get("/listas/ultima", obtenerUltimaLista);
router.put("/listas/:id", editarLista);

module.exports = router;
