import { productos as semilla } from "./productos.js";
import { validarProducto } from "./validacion.js";

export const CLAVE = "inventario:v1";

// Copia en memoria usada cuando localStorage no permite guardar
let respaldo = null;

// Obtiene localStorage sin lanzar error si el navegador lo bloquea
function resolverAlmacenamiento(almacenamiento) {
    try {
        return almacenamiento ?? globalThis.localStorage ?? null;
    } catch {
        return null;
    }
}

function copiar(lista) {
    return lista.map(p => ({ ...p }));
}

// Devuelve los productos guardados. Si no hay nada, el JSON está corrupto
// o localStorage falla, devuelve el respaldo en memoria o, en su defecto, la semilla.
export function cargarProductos(almacenamiento) {
    const sinGuardar = () => copiar(respaldo ?? semilla);

    try {
        const almacen = resolverAlmacenamiento(almacenamiento);
        const texto = almacen?.getItem(CLAVE);
        if (texto == null) return sinGuardar();

        const lista = JSON.parse(texto);
        return Array.isArray(lista) ? lista : sinGuardar();
    } catch {
        return sinGuardar();
    }
}

// Guarda la lista en localStorage. Si falla, la conserva en memoria.
// Devuelve true si quedó persistida.
export function guardarProductos(lista, almacenamiento) {
    try {
        const almacen = resolverAlmacenamiento(almacenamiento);
        if (!almacen) throw new Error("localStorage no disponible");
        almacen.setItem(CLAVE, JSON.stringify(lista));
        respaldo = null;
        return true;
    } catch {
        respaldo = copiar(lista);
        return false;
    }
}

// Valida y guarda un producto nuevo. Devuelve el resultado de la validación:
// { valido: true } o { valido: false, error }. Si es inválido no guarda nada.
export function agregarProducto(producto, almacenamiento) {
    const lista = cargarProductos(almacenamiento);
    const resultado = validarProducto(producto, lista);
    if (!resultado.valido) return resultado;

    const { codigo, nombre, precio, existencia } = producto;
    guardarProductos([...lista, { codigo, nombre, precio, existencia }], almacenamiento);
    return resultado;
}

// Devuelve el producto con ese código o undefined si no existe
export function obtenerProducto(codigo, almacenamiento) {
    return cargarProductos(almacenamiento).find(p => p.codigo === codigo);
}

// Borra el respaldo en memoria (útil para pruebas)
export function reiniciarRespaldo() {
    respaldo = null;
}
