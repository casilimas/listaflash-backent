const Lista = require("../models/Lista");

// POST /listas: Crear una nueva lista con número incremental
const crearLista = async (req, res) => {
  try {
    const ultimaLista = await Lista.findOne().sort({ numero: -1 });
    const nuevoNumero = ultimaLista ? ultimaLista.numero + 1 : 1;

    const nuevaLista = new Lista({ numero: nuevoNumero });
    await nuevaLista.save();

    res.status(201).json(nuevaLista);
  } catch (error) {
    console.error("❌ Error al crear la lista:", error.message);
    res.status(500).json({ message: "Error al crear la lista" });
  }
};

// GET /listas/ultima: Obtener la última lista creada
const obtenerUltimaLista = async (req, res) => {
  try {
    const ultimaLista = await Lista.findOne().sort({ numero: -1 });
    if (!ultimaLista) {
      return res.status(404).json({ message: "No hay listas creadas aún" });
    }
    res.json(ultimaLista);
  } catch (error) {
    console.error("❌ Error al obtener la última lista:", error.message);
    res.status(500).json({ message: "Error al obtener la última lista" });
  }
};

// PUT /listas/:id: Editar el número de una lista existente
const editarLista = async (req, res) => {
  const { id } = req.params;
  const { numero } = req.body;

  try {
    const lista = await Lista.findById(id);
    if (!lista) {
      return res.status(404).json({ message: "Lista no encontrada" });
    }

    if (numero !== undefined) lista.numero = numero;

    const listaActualizada = await lista.save();
    res.json(listaActualizada);
  } catch (error) {
    console.error("❌ Error al editar la lista:", error.message);
    res.status(500).json({ message: "Error al editar la lista" });
  }
};

module.exports = {
  crearLista,
  obtenerUltimaLista,
  editarLista,
};
