// const nota =  JSON.parse(localStorage.getItem('Notas')) || [];
const tareas =JSON.parse( localStorage.getItem("tareas")) || [];
const ulTarea = document.getElementById('ulTarea');

const listarTarea = () => {
    console.log(tareas)
    ulTarea.innerHTML = '';
    tareas.forEach((tarea, i) =>{
       console.log(tarea,i);
       let clase = tarea.notas.length > 0? 'text-dark bg-warning li' : '';
       ulTarea.innerHTML += `
        <li class"${clase}"> 
            <a  href="" data-toggle="modal" data-target="#exampleModal" class="${clase}" onclick="llenarModal(${i})">${tarea.titulo}</a>
            <button  class="btn btn-outline-dark"  onclick ="agregarEnProgreso(${i})"> Next   <i class="fas fa-arrow-alt-circle-right"></i>  </button>
        </li>`;
    })
}

const llenarModal = (index) => {
    let ulRecordatorio = "";
    let tarea = tareas[index];
    document.getElementById("titulotarea").innerText = tarea.titulo;
    listarNotas(index)

    document.querySelector("#btnRecordatorio").dataset.id = index;
}

const listarNotas = (index) => {
    ulRecordatorio.innerHTML = '';
    tareas[index].notas.forEach(function(item,i){
       console.log(item,i);
       ulRecordatorio.innerHTML += `<li> ${item}
       <button class="btn btn-outline-dark" onclick ="eliminarRecordatorio(${index}, ${i})"> Delete
        </button>
        </li>  `
    })
}

const eliminarRecordatorio = (indexTarea, indexNota) =>{
       tareas[indexTarea].notas.splice(indexNota,1);
        listarNotas(indexTarea);
}

const agregarRecordatorio = () => {
    let index = event.target.dataset.id;
    const nota =  document.querySelector("#inputRecordatorio").value
    tareas[index].notas.push(nota);
    localStorage.setItem('Notas',JSON.stringify(nota));
    listarNotas(index);
    listarTarea(); 
}

const agregarTarea = () =>{
 const tareaAgregada = document.getElementById('inpuTarea').value;
    console.log(tareaAgregada);
    tareas.push({ 
        titulo: tareaAgregada,
        notas: []
    });
    console.log(tareas);
    localStorage.setItem("tareas", JSON.stringify(tareas));
    listarTarea();
}

const enProgreso =JSON.parse( localStorage.getItem("enProgreso")) || [ ];
const ulEnProgreso = document.getElementById('ulEnProgreso');

const agregarEnProgreso = (index) =>{
    enProgreso.push(tareas[index]);
    tareas.splice(index,1);
    localStorage.setItem("enProgreso", JSON.stringify(enProgreso));
    localStorage.setItem("tareas", JSON.stringify(tareas));
    listarTarea();
    listarEnprogreso();
}

const  listarEnprogreso = () => {
    ulEnProgreso.innerHTML = '';
    enProgreso.forEach((tareas,i) => {
      console.log(tareas,i);                                                            
      ulEnProgreso.innerHTML += `<li>
       <button class="btn btn-outline-dark" onclick="regresarATareas(${i})"> To return 
        <i class="fas fa-arrow-alt-circle-left"></i></button> ${tareas.titulo}
         <button class="btn btn-outline-dark" onclick = "agregarACompletados(${i})"> Next 
         <i class="fas fa-arrow-alt-circle-right"></i>  </button>
        </li> `;
    
    })
}


const regresarATareas = (index) =>{
    tareas.push(enProgreso[index]);
    enProgreso.splice(index,1);
    localStorage.setItem("enProgreso", JSON.stringify(enProgreso));
    localStorage.setItem("tareas", JSON.stringify(tareas));
    listarTarea();
    listarEnprogreso();
}

const completados =  JSON.parse(localStorage.getItem("agregarACompletados")) || [];
const ulCompletados = document.getElementById('ulCompletados');


const agregarACompletados = (index) => {
    completados.push(enProgreso[index]);
    enProgreso.splice(index,1);
    localStorage.setItem("agregarACompletados",JSON.stringify(completados));
    localStorage.setItem("enProgreso", JSON.stringify(enProgreso));
    listarTarea();   
    listarEnprogreso();
    listarCompletados();
}

const listarCompletados = (i) => {
    ulCompletados.innerHTML = '';
    completados.forEach((enProgreso,index) => {
         console.log(enProgreso,i)
         ulCompletados.innerHTML += `<li> ${enProgreso.titulo} <button class="btn btn-outline-dark" > <i class="far fa-check-circle"></i> </buttton> </li>  `;
    })
}



listarTarea();
listarEnprogreso();
listarCompletados();
 



