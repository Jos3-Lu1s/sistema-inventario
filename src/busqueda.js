const productos = [
    { codigo: "345456", nombre: "cocacola", precio: 20, existencia: 50 },
    { codigo: "123789", nombre: "sabritas", precio: 18, existencia: 30 },
    { codigo: "987654", nombre: "galletas", precio: 15, existencia: 25 }
];

// Busca productos cuyo nombre contenga el texto indicado
function buscarProducto(texto) {
    return productos.filter(p => p.nombre.toLowerCase().includes(texto.toLowerCase()));
}

console.log(buscarProducto("coca"));
