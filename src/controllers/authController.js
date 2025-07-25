const User = require("../models/User");

// POST /register
const registerUser = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son obligatorios" });
    }

    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ message: "Usuario ya registrado" });

    await User.create({ nombre, email, password }); // nombre puede venir undefined
    res.status(201).json({ message: "Usuario registrado" });
  } catch (err) {
    res.status(500).json({ message: "Error al registrar" });
  }
};

// POST /login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await User.findOne({ email });
    if (!usuario || !(await usuario.matchPassword(password))) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    res.json({ 
      message: "Login exitoso", 
      user: { 
        nombre: usuario.nombre || null, 
        email: usuario.email 
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Error en el login" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
