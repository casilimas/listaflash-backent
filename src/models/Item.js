// src/models/Item.js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  cantidad: { type: Number, default: 1 },
  comprado: { type: Boolean, default: false },
  lista: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lista", // <-- Referencia al modelo Lista
    required: true,
  },
});

module.exports = mongoose.model("Item", itemSchema);
