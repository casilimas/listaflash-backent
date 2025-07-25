// config/db.js

const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.warn("⚠️  MONGO_URI no está definido. Saltando conexión a MongoDB.");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

