// Pruebas de la funcionalidad Producto (Fase de prueba).
// Cada prueba lleva el ID del caso de prueba diseñado (CP01 ... CP10).
//
// Crear un producto  -> agregarProducto + obtenerProducto (src/almacen.js)
// Mostrar un producto -> lineasDetalle (src/detalle.js), que es lo que
//                        mostrarProducto (src/main.js) pinta en pantalla.
import { agregarProducto, obtenerProducto, reiniciarRespaldo } from "../src/almacen.js";
import { lineasDetalle } from "../src/detalle.js";

// Almacenamiento falso con la misma interfaz que localStorage,
// para que cada prueba empiece con un inventario limpio.
function crearAlmacenFalso() {
    const datos = {};
    return {
        getItem: clave => (clave in datos ? datos[clave] : null),
        setItem: (clave, valor) => { datos[clave] = valor; }
    };
}

const teclado = { codigo: "P001", nombre: "Teclado", precio: 350, existencia: 10 };
const mouse = { codigo: "P002", nombre: "Mouse", precio: 180, existencia: 5 };

let almacen;

beforeEach(() => {
    reiniciarRespaldo();
    almacen = crearAlmacenFalso();
});

describe("Casos de prueba del documento", () => {
    test("CP01 - Crear producto: se crea con los datos proporcionados", () => {
        const resultado = agregarProducto(teclado, almacen);

        expect(resultado).toEqual({ valido: true });
        expect(obtenerProducto("P001", almacen)).toEqual(teclado);
    });

    describe("con el producto P001 (Teclado) creado", () => {
        let producto;

        beforeEach(() => {
            agregarProducto(teclado, almacen);
            producto = obtenerProducto("P001", almacen);
        });

        test("CP02 - Mostrar código: se almacena y se muestra P001", () => {
            expect(producto.codigo).toBe("P001");
            expect(lineasDetalle(producto)).toContain("Código: P001");
        });

        test("CP03 - Mostrar nombre: se conserva y se muestra Teclado", () => {
            expect(producto.nombre).toBe("Teclado");
            expect(lineasDetalle(producto)).toContain("Nombre: Teclado");
        });

        test("CP04 - Mostrar precio: se almacena y se muestra 350", () => {
            expect(producto.precio).toBe(350);
            expect(lineasDetalle(producto)).toContain("Precio: 350");
        });

        test("CP05 - Mostrar existencia: se conserva y se muestra 10", () => {
            expect(producto.existencia).toBe(10);
            expect(lineasDetalle(producto)).toContain("Existencia: 10");
        });

        test("CP06 - Mostrar información completa: aparecen los cuatro datos en orden", () => {
            expect(lineasDetalle(producto)).toEqual([
                "Código: P001",
                "Nombre: Teclado",
                "Precio: 350",
                "Existencia: 10"
            ]);
        });
    });

    test("CP07 - Crear segundo producto: no se confunde con el primero", () => {
        agregarProducto(teclado, almacen);
        const resultado = agregarProducto(mouse, almacen);

        expect(resultado).toEqual({ valido: true });
        expect(obtenerProducto("P002", almacen)).toEqual(mouse);
        expect(obtenerProducto("P001", almacen)).toEqual(teclado);

        const detalleMouse = lineasDetalle(obtenerProducto("P002", almacen));
        expect(detalleMouse).toEqual([
            "Código: P002",
            "Nombre: Mouse",
            "Precio: 180",
            "Existencia: 5"
        ]);
        expect(detalleMouse.join(" ")).not.toContain("Teclado");
    });
});

describe("Casos de prueba adicionales", () => {
    test("CP08 - Precio con decimales: se conserva y se muestra 349.99", () => {
        agregarProducto({ ...teclado, precio: 349.99 }, almacen);
        const producto = obtenerProducto("P001", almacen);

        expect(producto.precio).toBe(349.99);
        expect(lineasDetalle(producto)).toContain("Precio: 349.99");
    });

    test("CP09 - Existencia en cero: se muestra 0 y no se omite", () => {
        agregarProducto({ ...teclado, existencia: 0 }, almacen);
        const producto = obtenerProducto("P001", almacen);

        expect(producto.existencia).toBe(0);
        expect(lineasDetalle(producto)).toContain("Existencia: 0");
    });

    test("CP10 - Producto inexistente: se indica que no se encontró", () => {
        const producto = obtenerProducto("P999", almacen);

        expect(producto).toBeUndefined();
        expect(lineasDetalle(producto)).toEqual(["Producto no encontrado"]);
    });
});
