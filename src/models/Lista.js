const mongoose = require("mongoose");

const listaSchema = new mongoose.Schema({
  numero: { type: Number, required: true, unique: true }, // Número consecutivo
  creadaEn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Lista", listaSchema);
