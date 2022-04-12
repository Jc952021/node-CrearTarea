const { v4: uuidv4 } = require("uuid");

class Tarea {
  id = "";
  desc = "";
  completadoEn = null; //sera null para verificar si esta completado

  constructor(desc) {
    //solo recibiremos la desc que escribira el usuario
    this.id = uuidv4();
    this.desc = desc;
    this.completadoEn = null;
  }
}

module.exports= Tarea

//crear una clase,recordar que la clase su 1 letra es mayusc
//instalar el uuid para un id
