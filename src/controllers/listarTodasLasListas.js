const Lista = require("../models/Lista");

const listarTodasLasListas = async (req, res) => {
  try {
    const listas = await Lista.find().sort({ numero: -1 }); // orden descendente por número
    res.status(200).json(listas);
  } catch (error) {
    console.error("Error al listar todas las listas:", error);
    res.status(500).json({ mensaje: "Error al listar listas" });
  }
};

module.exports = listarTodasLasListas;
