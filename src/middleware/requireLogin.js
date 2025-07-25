const requireLogin = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: "No autenticado. Inicia sesión." });
  }
  next();
};

module.exports = requireLogin;
