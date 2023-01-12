const { response } = require("express");
const Hospital = require("../models/hospital");

const getHospitales = async (req, res = response) => {
  const hospitales = await Hospital.find().populate("usuario", "nombre img");

  res.json({
    ok: true,
    hospitales,
  });
};

const crearHospital = async (req, res = response) => {
  const uid = req.uid;

  const hospital = new Hospital({
    usuario: uid,
    ...req.body,
  });

  try {
    const hospitalDB = await hospital.save();

    res.json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al crear el hospital",
    });
  }
};

const actualizarHospital = async (req, res = response) => {
  // id del hospital
  const id = req.params.id;

  // id del usuario que realiza la actualizacion
  const uid = req.uid;

  try {
    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un hospital en la bd con el id proporcionado",
      });
    }

    const cambiosHospital = {
      ...req.body,
      usuario: uid,
    };

    const hospitalActualizado = await Hospital.findByIdAndUpdate(
      id,
      cambiosHospital,
      {
        new: true,
      }
    );

    res.json({
      ok: true,
      hospital: hospitalActualizado,
    });
    
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Consulte con el administrador",
    });
  }
};


const borrarHospital = async (req, res = response) => {

  // id del hospital
  const id = req.params.id;

  try {
    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un hospital en la bd con el id proporcionado",
      });
    }

    // Eliminar
    await Hospital.findByIdAndDelete(id)

    res.json({
      ok: true,
      msg: 'Hospital eliminado',
    });
    
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Consulte con el administrador",
    });
  }
};

module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
};
