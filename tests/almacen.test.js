import {
    CLAVE, agregarProducto, cargarProductos, guardarProductos, obtenerProducto, reiniciarRespaldo
} from "../src/almacen.js";
import { productos as semilla } from "../src/productos.js";

// Almacenamiento falso con la misma interfaz que localStorage
function crearAlmacenFalso(inicial = {}) {
    const datos = { ...inicial };
    return {
        getItem: clave => (clave in datos ? datos[clave] : null),
        setItem: (clave, valor) => { datos[clave] = valor; }
    };
}

const almacenQueFalla = {
    getItem() { throw new Error("bloqueado"); },
    setItem() { throw new Error("bloqueado"); }
};

const nuevo = { codigo: "111", nombre: "agua", precio: 10, existencia: 5 };

beforeEach(() => reiniciarRespaldo());

describe("cargarProductos", () => {
    test("devuelve la semilla si no hay nada guardado", () => {
        expect(cargarProductos(crearAlmacenFalso())).toEqual(semilla);
    });

    test("devuelve una copia de la semilla, no el mismo arreglo", () => {
        const lista = cargarProductos(crearAlmacenFalso());
        lista.push(nuevo);
        expect(semilla).toHaveLength(4);
    });

    test("devuelve lo guardado cuando existe", () => {
        const almacen = crearAlmacenFalso({ [CLAVE]: JSON.stringify([nuevo]) });
        expect(cargarProductos(almacen)).toEqual([nuevo]);
    });

    test("usa la semilla si el JSON está corrupto", () => {
        const almacen = crearAlmacenFalso({ [CLAVE]: "{no es json" });
        expect(cargarProductos(almacen)).toEqual(semilla);
    });

    test("usa la semilla si lo guardado no es un arreglo", () => {
        const almacen = crearAlmacenFalso({ [CLAVE]: JSON.stringify({ a: 1 }) });
        expect(cargarProductos(almacen)).toEqual(semilla);
    });

    test("usa la semilla si localStorage lanza error", () => {
        expect(cargarProductos(almacenQueFalla)).toEqual(semilla);
    });
});

describe("guardarProductos", () => {
    test("guarda en la clave inventario:v1 y se puede volver a cargar", () => {
        const almacen = crearAlmacenFalso();
        expect(guardarProductos([nuevo], almacen)).toBe(true);
        expect(almacen.getItem("inventario:v1")).toBe(JSON.stringify([nuevo]));
        expect(cargarProductos(almacen)).toEqual([nuevo]);
    });

    test("si localStorage falla, no lanza error y conserva la lista en memoria", () => {
        expect(guardarProductos([nuevo], almacenQueFalla)).toBe(false);
        expect(cargarProductos(almacenQueFalla)).toEqual([nuevo]);
    });
});

describe("agregarProducto", () => {
    test("guarda un producto válido junto a los existentes", () => {
        const almacen = crearAlmacenFalso();
        expect(agregarProducto(nuevo, almacen)).toEqual({ valido: true });
        expect(cargarProductos(almacen)).toEqual([...semilla, nuevo]);
    });

    test("el producto agregado sobrevive a una nueva carga", () => {
        const almacen = crearAlmacenFalso();
        agregarProducto(nuevo, almacen);
        expect(obtenerProducto("111", almacen)).toEqual(nuevo);
    });

    test("con código repetido no guarda nada y devuelve error", () => {
        const almacen = crearAlmacenFalso();
        const resultado = agregarProducto({ ...nuevo, codigo: "345456" }, almacen);
        expect(resultado.valido).toBe(false);
        expect(typeof resultado.error).toBe("string");
        expect(almacen.getItem(CLAVE)).toBeNull();
    });

    test("con datos inválidos no guarda nada", () => {
        const almacen = crearAlmacenFalso();
        expect(agregarProducto({ ...nuevo, precio: -5 }, almacen).valido).toBe(false);
        expect(agregarProducto({ ...nuevo, existencia: 1.5 }, almacen).valido).toBe(false);
        expect(almacen.getItem(CLAVE)).toBeNull();
    });

    test("sigue funcionando en memoria si localStorage falla", () => {
        expect(agregarProducto(nuevo, almacenQueFalla)).toEqual({ valido: true });
        expect(obtenerProducto("111", almacenQueFalla)).toEqual(nuevo);
    });
});

describe("obtenerProducto", () => {
    test("devuelve el producto con ese código", () => {
        expect(obtenerProducto("345456", crearAlmacenFalso())).toEqual(semilla[0]);
    });

    test("devuelve undefined si el código no existe", () => {
        expect(obtenerProducto("000", crearAlmacenFalso())).toBeUndefined();
    });
});
