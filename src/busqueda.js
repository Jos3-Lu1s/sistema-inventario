import { productos } from "./productos.js";

// Devuelve los productos cuyo nombre contiene `texto`, sin distinguir mayúsculas.
// Si `texto` es "", devuelve todos los productos. No modifica `lista`.
export function buscarProducto(texto, lista = productos) {
    const busqueda = texto.toLowerCase();
    return lista.filter(p => p.nombre.toLowerCase().includes(busqueda));
}
