import { buscarProducto } from "./busqueda.js";

const inputBusqueda = document.getElementById("busqueda");
const cuerpoTabla = document.querySelector("#tabla-productos tbody");
const sinResultados = document.getElementById("sin-resultados");

// Dibuja los productos en la tabla y muestra u oculta el mensaje de "sin resultados"
function dibujarProductos(lista) {
    cuerpoTabla.replaceChildren();

    for (const producto of lista) {
        const fila = document.createElement("tr");
        for (const valor of [producto.codigo, producto.nombre, producto.precio, producto.existencia]) {
            const celda = document.createElement("td");
            celda.textContent = valor;
            fila.appendChild(celda);
        }
        cuerpoTabla.appendChild(fila);
    }

    sinResultados.hidden = lista.length > 0;
}

inputBusqueda.addEventListener("input", () => {
    dibujarProductos(buscarProducto(inputBusqueda.value));
});

dibujarProductos(buscarProducto(""));
