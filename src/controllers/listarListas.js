const Lista = require("../models/Lista");
const Item = require("../models/Item");

const listarListaPorNumero = async (req, res) => {
  try {
    const { numero } = req.params;

    if (!numero) {
      return res.status(400).json({ error: "Número de lista requerido" });
    }

    // Buscar la lista por número
    const lista = await Lista.findOne({ numero: Number(numero) });

    if (!lista) {
      return res.status(404).json({ mensaje: "La lista no existe" });
    }

    // Buscar los items asociados correctamente (campo 'lista', no 'listaId')
    const items = await Item.find({ lista: lista._id });

    return res.status(200).json({
      lista: {
        id: lista._id,
        numero: lista.numero,
        creadaEn: lista.creadaEn,
      },
      items,
    });
  } catch (error) {
    return res.status(500).json({ error: "Error al buscar la lista" });
  }
};

module.exports = listarListaPorNumero;
