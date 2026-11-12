import { cargarProductos } from "./almacen.js";

// Devuelve los productos cuyo nombre contiene `texto`, sin distinguir mayúsculas.
// Si `texto` es "", devuelve todos los productos. No modifica `lista`.
// Por defecto busca en los productos guardados (o en la semilla si no hay ninguno).
export function buscarProducto(texto, lista = cargarProductos()) {
    const busqueda = texto.toLowerCase();
    return lista.filter(p => p.nombre.toLowerCase().includes(busqueda));
}
