const tarea_agregada = document.querySelector("#tarea-id")
const agregar_tarea = document.querySelector("#agregar-tarea-button")
const tareas_pendientes = document.querySelector("#tareas-pendientes-p")
const span_error_input = document.querySelector(".span-error")
const eliminar_tareas = document.querySelector("#eliminar-tareas")

document.addEventListener("DOMContentLoaded", iniciarApp)

eliminar_tareas.addEventListener("click", (e) => {
    localStorage.clear()
    RenderizarTareas()
    TareasPendientes()
})

agregar_tarea.addEventListener("click", (e) => {

    const nueva_tarea = tarea_agregada.value

    if (nueva_tarea.trim() === "") {
        span_error_input.classList.toggle("activate")
        setTimeout(() => {
            span_error_input.classList.toggle("activate")
        }, 2000)
        return    
    }
    
    let array_tareas = JSON.parse(localStorage.getItem('mis_tareas')) || [];
    array_tareas.push(nueva_tarea)
    localStorage.setItem("mis_tareas", JSON.stringify(array_tareas))

    tarea_agregada.value = ""

    RenderizarTareas()
    TareasPendientes()
} )

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
        li_tarea.textContent = contenido_tarea
        lista_tareas.appendChild(li_tarea)
    })
}

function iniciarApp () {

    RenderizarTareas()
    TareasPendientes()
}