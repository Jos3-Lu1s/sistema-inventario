// Valida un producto antes de guardarlo.
// Devuelve { valido: true } o { valido: false, error: "<mensaje>" }.
// `lista` son los productos ya guardados, para detectar códigos repetidos.
export function validarProducto(producto, lista = []) {
    const { codigo, nombre, precio, existencia } = producto;

    if (typeof codigo !== "string" || codigo === "") {
        return { valido: false, error: "El código no puede estar vacío" };
    }
    if (lista.some(p => p.codigo === codigo)) {
        return { valido: false, error: "Ya existe un producto con ese código" };
    }
    if (typeof nombre !== "string" || nombre.trim() === "") {
        return { valido: false, error: "El nombre no puede estar vacío" };
    }
    if (typeof precio !== "number" || !Number.isFinite(precio) || precio < 0) {
        return { valido: false, error: "El precio debe ser un número mayor o igual a 0" };
    }
    if (!Number.isInteger(existencia) || existencia < 0) {
        return { valido: false, error: "La existencia debe ser un entero mayor o igual a 0" };
    }

    return { valido: true };
}
