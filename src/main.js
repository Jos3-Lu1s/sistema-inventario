import { agregarProducto, obtenerProducto } from "./almacen.js";
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

const formAlta = document.getElementById("form-alta");
const errorAlta = document.getElementById("error-alta");

// Vuelve a dibujar la tabla respetando el texto de búsqueda actual
function actualizarTabla() {
    dibujarProductos(buscarProducto(inputBusqueda.value));
}

inputBusqueda.addEventListener("input", actualizarTabla);

formAlta.addEventListener("submit", (evento) => {
    evento.preventDefault();

    // valueAsNumber da NaN si el campo está vacío, y la validación lo rechaza
    const resultado = agregarProducto({
        codigo: document.getElementById("alta-codigo").value,
        nombre: document.getElementById("alta-nombre").value,
        precio: document.getElementById("alta-precio").valueAsNumber,
        existencia: document.getElementById("alta-existencia").valueAsNumber
    });

    if (!resultado.valido) {
        errorAlta.textContent = resultado.error;
        return;
    }

    errorAlta.textContent = "";
    formAlta.reset();
    actualizarTabla();
});

const formDetalle = document.getElementById("form-detalle");
const detalleProducto = document.getElementById("detalle-producto");

// Muestra código, nombre, precio y existencia del producto con ese código
// en #detalle-producto, o "Producto no encontrado" si no existe.
export function mostrarProducto(codigo) {
    detalleProducto.replaceChildren();

    const producto = obtenerProducto(codigo);
    if (!producto) {
        detalleProducto.textContent = "Producto no encontrado";
        return;
    }

    const datos = [
        ["Código", producto.codigo],
        ["Nombre", producto.nombre],
        ["Precio", producto.precio],
        ["Existencia", producto.existencia]
    ];
    for (const [etiqueta, valor] of datos) {
        const linea = document.createElement("p");
        linea.textContent = `${etiqueta}: ${valor}`;
        detalleProducto.appendChild(linea);
    }
}

formDetalle.addEventListener("submit", (evento) => {
    evento.preventDefault();
    mostrarProducto(document.getElementById("detalle-codigo").value);
});

actualizarTabla();
