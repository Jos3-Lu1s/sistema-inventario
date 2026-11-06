import { buscarProducto } from "../src/busqueda.js";

describe("buscarProducto", () => {
    test("coincidencia parcial: 'coca' devuelve cocacola", () => {
        const resultado = buscarProducto("coca");
        expect(resultado).toHaveLength(1);
        expect(resultado[0].nombre).toBe("cocacola");
    });

    test("no distingue mayúsculas: 'PEPSI' devuelve pepsi", () => {
        const resultado = buscarProducto("PEPSI");
        expect(resultado).toHaveLength(1);
        expect(resultado[0].nombre).toBe("pepsi");
    });

    test("sin coincidencias: 'xyz' devuelve un arreglo vacío", () => {
        expect(buscarProducto("xyz")).toEqual([]);
    });

    test("texto vacío devuelve los 4 productos", () => {
        expect(buscarProducto("")).toHaveLength(4);
    });
});
