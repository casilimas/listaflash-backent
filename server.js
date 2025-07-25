// server.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const itemRoutes = require("./src/routes/itemRoutes");
const listaRoutes = require("./src/routes/listaRoutes");

// Inicializar app y servidor
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

const PORT = process.env.PORT || 3900;

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Inyectar io en todas las peticiones
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api", itemRoutes);
app.use("/api", listaRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Backend de LISTAFLASH");
});

// WebSocket sin logs
io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    // Desconexión del cliente
  });
});

// Iniciar servidor con soporte para WebSocket
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
