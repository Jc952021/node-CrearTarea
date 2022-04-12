//las tareas deben verse asi
/**
 *  _listado:
 *      {  'uuid-123712-123123-2: { id:12, desc:asd,completadoeEN:92231 }  },
 */

const Tarea = require("./tarea");

class Tareas {
  _listado = {}; //el guion abajo creo que significa una variable mas privada

  constructor() {
    this._listado = {};
  }
  //get arreglo para que lo usen el arreglo de tareas en las demas funciones
  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      //el object.keys saca las props de un obj y los pone dentro en un array sin su valor,lo transfrma en un string de forma ascendente
      const tarea = this._listado[key]; // del listado que es un obj en su pos del keyid- esto me daria el objeto de ese id,que seria una tarea
      listado.push(tarea); //en el nuevo arr creado pushear los objetos tarea
    });
    return listado;
  }
  //funcion para guardar lo de la db y pasarlo al _listado
  arrayFromListado(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }
  //funcion para mostrar la lista de tareas
  listadoCompleto() {
    console.log(); //para separar un poco
    this.listadoArr.forEach((tarea, i) => {
      const idx = `${i + 1}.`.green;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completado".green : "Pendiente".red;
      console.log(`${idx} ${desc} :: ${estado}`);
    });
  }
  //funcion para mostrar tareas completadas/pendientes
  listarPendientesCompletadas(completadas = true) {
    console.log();
    let contador = 0; //le sumaremos luego por cada tarea ya que no podemos usar el indice
    this.listadoArr.forEach((tarea) => {
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completado".green : "Pendiente".red;

      if (completadas) {
        //si le mande true entonces
        if (completadoEn) {
          contador += 1;
          console.log(`${(contador + ".").green} ${desc} :: ${estado}`); //el + "." lo trandforma en unn string,ya que el contado en number
        }
      } else {
        if (!completadoEn) {
          //si no existe entonces mostrar los no compleatdos
          contador += 1;
          console.log(`${(contador + ".").green} ${desc} :: ${estado}`);
        }
      }
    });
  }
  //funcion para cambiar el competado de la tarea
  toggleCompletadas(ids) {
    ids.forEach((id) => {
      //por cada id
      const tarea = this._listado[id]; //de listado orginal-creo que si quremos borrar algo siempre se debe referir al arreglo original
      if (!tarea.completadoEn) {
        //si esa tarea es null
        tarea.completadoEn = new Date().toISOString(); //entonces ese completadoen su valor sera el new date,pero en string
      }
    });
    //para las no completadas entonces
    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        //en el arreglo de ids,si no incluye una tarea id entonces
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }

  //funcion crear tarea
  crearTarea(desc) {
    const tarea = new Tarea(desc); //crear una nueva tarea con el param
    this._listado[tarea.id] = tarea; //como listado es un objeto,en su posc id sera la tarea creada
  }
  //funcion para borrar la tarea
  borrarTarea(id) {
    if (this._listado[id]) {
      delete this._listado[id]; //el delete solo borra una prop de un obj,creo que temporalmente
    }
  }
}

module.exports = Tareas;

//vid11
//crear una nueva funcion metodo crear tarea

//vid12
//crear un get para crear un arreglo - el get en clases es como si crearas una propiedad de un objeto fusionado con una funcion
//pero a la vez no es una funcion,si lo llamas, tareas.listadoArr() ,dara error.este actualizara el listado
//este debe retornar un arreglo y se debe ver en la opcion 2.imprimir el listadoarr ahi,donde saldra un arr de objetos-
//notar que sale tarea antes del objeto,este es solo visual

//vid15
//crear la funcion que reciba las tareas de la db y ponerlo edntro del _listado
//por cada tarea lo pasamos al objeto listado,donde tendra una prop id y esta id tendra la tera de su misma id

//vid16
//crear una nueva funcion para la nueva lista

//vid17
//crear la funcion de que si llega true se vera las tareas compleatas,si no las pendientes

//vide21
//se crea una funcion donde de acuerdo a los ids ,la tarea debe estar completada y si no esta el id
//entonces no completada
