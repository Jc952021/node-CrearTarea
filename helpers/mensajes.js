require("colors");


const mostrarMenu=()=>{

  return new Promise((resolve)=>{
    console.log("=======================".green)
    console.log("Seleccione una opción".green)
    console.log("=======================\n".green)
  
  console.log(`${"1.".green} Crear tarea`)
  console.log(`${"2.".green} Listar tareas`)
  console.log(`${"3.".green} Listar tareas completadas`)
  console.log(`${"4.".green} Listar tareas pendientes`)
  console.log(`${"5.".green} Completar tarea(s)`)
  console.log(`${"6.".green} Borrar tarea`)
  console.log(`${"0.".green} Salir \n`)
  
  const readLine = require("readline").createInterface({ //crear la interface
    input:process.stdin, //este es para que reciba una info y siga con enter
    output:process.stdout //es para mostrar algo en la consola despues del enter
  })
  readLine.question("Escoger una opcion: ",(res)=>{ //este hace una pregunta
    readLine.close() //cierra la interface
    resolve(res) //le madamos como solucion lo que puso el usuario
  })  

  })
}

const pausa=()=>{

  return new Promise((resolve)=>{
    const readLine = require("readline").createInterface({ 
      input:process.stdin, 
      output:process.stdout 
    })
    readLine.question(`Presione ${"enter".green} para continuar: `,()=>{
      readLine.close()
      resolve() // no le mandamos nada pero terminaria esta funcion
    })  

  })
}


module.exports ={
  mostrarMenu,
  pausa
}

//vid5 crear algunos console.log con colors
//se trae el readline que es de node
//hacer otra funcion para pausar
//llevarlo a la otra funcion para que lo ejecute,habia un problema ya que no aparecia la 1 funcion
//escoger una opcion ya que tenia un callback y este pasaba a otro espacio