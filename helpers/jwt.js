const jwt = require("jsonwebtoken");

const generarJwt = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };

    // Crear jwt
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "12h" },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Error al generar el jwt " + err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generarJwt,
};
