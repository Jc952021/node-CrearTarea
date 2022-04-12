const inquirer = require('inquirer');
require("colors")

const preguntas=[
  {
    type:"list",
    name:"opcion",
    message:"¿Que desea hacer?\n",
    choices :[ //aca estaran las opciones a escoger
      { 
      value:"1", //se debe poner un valor para saber que opcion hemos elegido
      name:`${"1.".green} Crear tarea`
      },
      { 
      value:"2",
      name:`${"2.".green} Listar tareas`
      },
      { 
      value:"3",
      name:`${"3.".green} Listar tareas completadas`
      },
      { 
      value:"4",
      name:`${"4.".green} Listar tareas pendientes`
      },
      { 
      value:"5",
      name:`${"5.".green} Completar tarea(s)`
      },
      { 
      value:"6",
      name:`${"6.".green} Borrar tarea`
      },
      { 
      value:"0",
      name:`${"0.".green} Salir`
      },
    ] 
  }
]

const inquirerMenu=async()=>{
  console.clear()
  console.log("=======================".green)
  console.log("Seleccione una opción".green)
  console.log("=======================\n".green)

//este crearia una interfaz y al seleccionar algo nos trae un objeto con el nombre de la pregunta y su value
const {opcion} = await inquirer.prompt(preguntas) 
//el de arriba trae { opcion: '0' } - pero destructuramos la opcion que tendra solo el valor
return opcion
}

const inquirerPausa=async()=>{
//crear una pregunta para el prompt
const question = [ {
  type:"input",
  name:"pausa",
  message:`Presione ${"enter".green} para continuar`
}]

await inquirer.prompt(question) //no hay que retornar nada
}
//leerinput opcion 1 al crear una tarea
const leerInput=async(message)=>{
  const question = [ {
    type:"input",
    name:"desc",
    message, //este sera el mismo mensaje que llego en el param
  validate(value){ //con esto se valida que el usuario lo que escriba en el input no sea 0
    if(value.length === 0){
      return "Por favor ingrese un valor"
    }
    return true  //sig que lo que puso es valido
  }
  }]
const {desc} = await inquirer.prompt(question) //solo quiero la des del objeto
return desc
}
//funcion para borrar algo del listado
const listadoTareasBorrar=async(tareas)=>{
//construir una pregunta pero 1 se hara las choices(este debe ser un arreglo de obj para mostrar su valor)
const choices = tareas.map((tarea,i)=>{
  const idx = `${i+1}.`.green
  return{
    value:tarea.id,
    name:`${idx} ${tarea.desc}`
  }
})
//agregar al comienzo una nueva opcion
choices.unshift({
  value:"0",
  name:"0.".green + " Cancelar"
})
//ya con el choices armar la pregunta
const question =[
  {
    type:"list",
    name:"id",
    message:"Borrar",
    choices
  }
]
const {id} =  await inquirer.prompt(question)
return id //que retorne el id,que seria el value de una tarea al escogerla
}

//funcion de confimrar
const confirmar=async(message)=>{
  const question =[
    {
      type :"confirm", //es otro metodo donde te saldra (y/n)
      name : "ok",
      message
    }
  ]
const {ok} = await inquirer.prompt(question)
return ok  //este devuelve true o false

}
//funcion para mostrar un listado de tareas con check , es como la funcion listadotareasborrar
const mostrarListadoChecklist=async(tareas)=>{
  const choices = tareas.map((tarea,i)=>{
    const idx = `${i+1}.`.green
    return{
      value:tarea.id,
      name:`${idx} ${tarea.desc}`,
      checked:tarea.completadoEn ? true:false //el check muestra un boton verde si esta en true
    }
  })
  
  //ya con el choices armar la pregunta
  const question =[
    {
      type:"checkbox", //ahora sera de tipo checbox
      name:"ids", //este te traera un arreglo con los id que estan en true
      message:"Seleccione",
      choices
    }
  ]
  const {ids} =  await inquirer.prompt(question)
  return ids //que retorne el arreglo de ids
}

module.exports={
  inquirerMenu,
  inquirerPausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist
}


//ver su doc https://www.npmjs.com/package/inquirer
//crear una funcion async ya que inquirer trabaja con promesas
//pegar ahi lo de la funcion menu
//este inquirer debe recibir en su prompt un array de obj
//cada pregunta ira dentro del obj
//pasarlo al app

//vid9
//en choices se puede mandar objetos indicando el valor de cada opcion
//al retornar el opt se retornaba un objeto con el nombre de la lista y su valor
//pero solo queremos el valor,por eso la destructuracion
//crear otra funcion para pausar 

//vid18
//crear un inquirer donde debe mostrar las opciones que tengan las tareas que quieres borrar

//vid19
//crear otro inquirer de confirmacion,exportarlo en app