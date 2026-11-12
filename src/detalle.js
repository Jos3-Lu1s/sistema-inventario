// Devuelve las líneas de texto con la información de un producto:
// código, nombre, precio y existencia, en ese orden.
// Si el producto no existe (undefined o null), devuelve ["Producto no encontrado"].
// La usa mostrarProducto (main.js) y se puede probar sin navegador.
export function lineasDetalle(producto) {
    if (!producto) return ["Producto no encontrado"];

    return [
        `Código: ${producto.codigo}`,
        `Nombre: ${producto.nombre}`,
        `Precio: ${producto.precio}`,
        `Existencia: ${producto.existencia}`
    ];
}
