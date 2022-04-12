const { guardarDB, leerDb } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  inquirerPausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
} = require("./helpers/inquirer");

const Tareas = require("./models/tareas");

require("colors");

console.clear();

const main = async () => {
  let option = "";
  const tareas = new Tareas(); //traer las tareas para que abajo acceda a su funcion crear tarea

  // do {
  // option = await mostrarMenu() //este retornara lo que puso el usuario
  // //para detener mas rapido hacer un if,es decir si el user pone un 0 se va defrente abajo acabando el while sin mostrar el pausa
  // if(option!=="0") await pausa()

  // } while (option!=="0"); //si el option es diferente de 0 entonces que continue-notar que es un string

//traer la data del json
const dbTareas = leerDb()
if(dbTareas){
tareas.arrayFromListado(dbTareas)//pasarle las tareas de la db
}

  do {
    option = await inquirerMenu();

    switch (option) {
      case "1": //crear tarea
        const desc = await leerInput("Descripcion:");
        //y con la descripcion que puso el usuario ,entonces crear en el listado de tareas una tarea con la funcion
        tareas.crearTarea(desc);
        break;
      case "2": //ver todas las tareas
        tareas.listadoCompleto();
        break
      case "3":
        tareas.listarPendientesCompletadas(true);
        break
      case "4":
        tareas.listarPendientesCompletadas(false);
        break
      case "5":
       const ids = await mostrarListadoChecklist(tareas.listadoArr) 
       tareas.toggleCompletadas(ids)
        break
      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr)
        if(id!=="0"){ //si no es 0 entonces que lo confirme si no pasa al break
          const ok = await confirmar("¿Estas Seguro?")
          if(ok){
            tareas.borrarTarea(id)
            console.log("Tarea eliminada")
          }
        }
        break
    }

   //guardar el arreglo de tareas en un archivo dentro de db ,despues de una opcion
   guardarDB(tareas.listadoArr)

    //     const tarea = new Tarea("Comprar algo")
    // console.log(tarea)
    await inquirerPausa();
  } while (option !== "0");
};

main();

//video4
//npm init - crear el app- gitignore
//npm i colors-traerlo con require -crear una funcion async

//video5
//crear carp. helpers - mensajes
//crear una funcion de mostrarmenu- ir ahi

//vid6
//al ejecutar con node se ve el pausa sin ver el mostrarmenu,para eso ir a su funcion y que sea asicrona
//pero si era async solo debe recibir un return y ese return estaba en otro scope,entonces se retorna un new promise
//hacer un do while - este primero ejecuta lo de dentro del do y se repite de acuerdo al while
//si el usuario pone 0 (la opcion salir) entonces detiene el while

//video8
//instalar npm i inquirer,paquete para mejorar la interface
//en helper crear un arch inquirer ,hacer un require ir ahi

//video9
//ir a inquirer

//vid10
//crear una carp de modelos una de tarea , otra de tareas -crear clases para cada una
//para crear un nueva clase se pone un new

//video11
//ir a tareas
//hacer un switch de acuerdo al option que me envio el usuario
//como despues que escogemos una opcion acababa el proceso.para que persista se hace un do while
//si es el 1 entonces se debe crear una tarea-para eso crear otro inquirer
//donde el usuario debe poner una desc para crear una tarea
//en el caso 2 imprimir el listado de tareas

//vid12
//en la opcion dos queremos que nos muestre un listado pero este que sea un arreglo de tareas- ir a tareas

//vid13
//necesitamos guardar los datos en un json despues de una opcion-crear un arch en helpers-guardararch-irahi

//vid14
//crear una funcion para leer la base de datos-ir a guardar archivo

//vid15
//crear otra funcin en tareas
//traerlo aqui para que le pasemos las tareas qwue estaban en la db, solo si existe

//vid16
//en la opcion 2 que nos muestre una nueva lista-ir a tareas

//vid17
//hacer otra funcion para la opcion 3 y 4-ir a tareas

//vid18
//crear una funcion para la opcion 6 borrar-ir a inquirer
//ejecutar la funcion listado borrar enviandolo de param el listado

//vid19
//crear una funcion borrartarea en tareas
//ya creada la funcion-debemos crear otro inquirer de confirmacion
//traer el inquirer confirmar
//en el inquirer cuando mostremos las opciones a borrar
//poner uno para cancelar con value 0

//vid20
//para la opcion 5 se crea un inquirer,donde recibira las tareas,ir a inquirer 

//vid21
//en la opcion 5 cuando recibimos el arreglo de ids crearemos una funcion -ir a tareas