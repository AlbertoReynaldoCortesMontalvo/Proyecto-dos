const formulario = document.getElementById('form');
const listaTareas = document.getElementById('list');
let tareas = []


// eventsListener
eventListeners();

function eventListeners() {
    formulario.addEventListener('submit', agregarTarea);

    document.addEventListener('DOMContentLoaded', ()=> {
        tareas = JSON.parse(localStorage.getItem('tareas')) || []

        console.log(tareas);
        renderDom();
    })
}

// Funciones 

// Agregar tareas
function agregarTarea(e) {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const description = document.querySelector('#desc').value;

    // validacion
    if(description === '' &&  title === '' ||  description === '' ||  title === ''){
        console.log('Estos Campos no debe ir vacio');

        return;
    }

    const tareaObj = {
        title,
        description
    }

    // Agragar arrglos de tareas 
    tareas = [...tareas, tareaObj];
    console.log(tareas);

    // Después creamos el html
    renderDom();

    // Resetear
    formulario.reset();

}

function renderDom() {
    limpiarHTML();

    if(tareas.length > 0) {
        tareas.forEach((tarea) => {
            //Agregamos el botón eliminar 
            const btnContent = document.createElement('div')
            btnContent.classList.add('delate-content');
            const btnDelate = document.createElement('button');
            btnDelate.classList.add('btn-delate', 'btn');
            btnDelate.innerText = 'Eliminar';

            // Añadimos la función de eliminar
            btnDelate.onclick = ()=>{
                borrarTarea(tarea.title)
            }
            // Creamos el HTML
            const listItem = document.createElement('div');
            listItem.classList.add('list-item');
            // div List
            const div = document.createElement('div');
            div.classList.add('list-content');
            // titulo Tarea
            const titleList = document.createElement('p');
            titleList.classList.add('list-title');
            // descripción Tarea
            const descList = document.createElement('p');
            descList.classList.add('list-desc');

            // introducimos los valores
            titleList.innerText = tarea.title;
            descList.innerText = tarea.description;


            // appendChild´s 
            // content localStorage
            div.appendChild(titleList);
            div.appendChild(descList);
            listItem.appendChild(div);
            
            // btn Eliminar 
            btnContent.appendChild(btnDelate);
            listItem.appendChild(btnContent);

            listaTareas.appendChild(listItem);

        })

    }
    sincronizarStorage();
}


// Agregar tareas a localstorage 
function sincronizarStorage() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Borrar los tweets jejeje
function borrarTarea(id) {
    tareas = tareas.filter(tarea => tarea.title !== id);

    renderDom();
}


// Limpiar HTML 
function limpiarHTML() {
    while(listaTareas.firstChild){
        listaTareas.removeChild(listaTareas.firstChild);
    }
}


