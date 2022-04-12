const fs = require("fs");

const ruta = "./db/db.json"; //como se llamara en el app,entonces buscar una ruta desde ahi

const guardarDB = (data) => {
  fs.writeFileSync(ruta, JSON.stringify(data));
};

const leerDb = () => {
  if (!fs.existsSync(ruta)) { //esto verifica si existe la ruta
    return null; //si no existe entonces retorna null
  }
  const info = fs.readFileSync(ruta, { encoding: "utf-8" }); //el encoding elimina el byte
  const data = JSON.parse(info); //la datas como estaba stringifyiado,que me regrese normal

  return data;
};

module.exports = {
  guardarDB,
  leerDb,
};
//hacer un require-crear la carp db para que se guarde ahi
//el write solo recibe de data un string

//vid14
//crear la funcion leerdb para ver si existe algo dentro del json
