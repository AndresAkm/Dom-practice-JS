const tarea_agregada = document.querySelector("#tarea-id")
const tareas_pendientes = document.querySelector("#tareas-pendientes-p")
const span_error_input = document.querySelector(".span-error")
const eliminar_tareas = document.querySelector("#eliminar-tareas")
const formulario_tareas = document.querySelector("#form-tareas")

document.addEventListener("DOMContentLoaded", IniciarApp)
formulario_tareas.addEventListener("submit", ValidarTarea)

eliminar_tareas.addEventListener("click", (e) => {
    localStorage.clear()
    RenderizarTareas()
    TareasPendientes()
})

let boton_agregar_bloqueado = false
let alerta_error_mostrandose = false

function ValidarTarea(e) {
    e.preventDefault()

    if (boton_agregar_bloqueado) return;

    const nueva_tarea = tarea_agregada.value
    
    if (tarea_agregada.value.trim() === "") {
        if (alerta_error_mostrandose) return
        alerta_error_mostrandose = true
        span_error_input.classList.add("activate");

        setTimeout(() => {
            span_error_input.classList.remove("activate");
            alerta_error_mostrandose = false
        }, 2000);
        return;
    }

    boton_agregar_bloqueado = true;

    agregarTarea(nueva_tarea);
    
    setTimeout(() => {
        boton_agregar_bloqueado = false;
    }, 1000);
}

function agregarTarea(nueva_tarea) {

    let array_tareas = JSON.parse(localStorage.getItem('mis_tareas')) || [];
    array_tareas.push(nueva_tarea)
    localStorage.setItem("mis_tareas", JSON.stringify(array_tareas))

    tarea_agregada.value = ""

    RenderizarTareas()
    TareasPendientes()
}

function TareasPendientes () {
    const total_tareas = JSON.parse(localStorage.getItem("mis_tareas")) || []
    tareas_pendientes.textContent = `Tareas pendientes: ${total_tareas.length}`
}

function RenderizarTareas () {

    const lista_tareas = document.querySelector("#lista-tareas")
    lista_tareas.innerHTML = ''

    const total_tareas = JSON.parse(localStorage.getItem("mis_tareas")) || []
    total_tareas.forEach ((contenido_tarea, index) => {

        const li_tarea = document.createElement("li")
        const boton_eliminar_li = document.createElement("button")
        boton_eliminar_li.textContent = "❌"
        boton_eliminar_li.classList.add("btn-eliminar")
        li_tarea.textContent = `${index + 1}. ${contenido_tarea}`
        li_tarea.appendChild(boton_eliminar_li)
        lista_tareas.appendChild(li_tarea)

        boton_eliminar_li.addEventListener("click", () => {
            total_tareas.splice(index, 1)
            localStorage.setItem("mis_tareas", JSON.stringify(total_tareas))
            RenderizarTareas()
            TareasPendientes()
        })
    })

}

function IniciarApp () {

    RenderizarTareas()
    TareasPendientes()
}