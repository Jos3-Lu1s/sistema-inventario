import { validarProducto } from "../src/validacion.js";

const valido = { codigo: "111", nombre: "agua", precio: 10, existencia: 5 };

describe("validarProducto", () => {
    test("acepta un producto válido", () => {
        expect(validarProducto(valido, [])).toEqual({ valido: true });
    });

    test("acepta precio 0 y existencia 0", () => {
        expect(validarProducto({ ...valido, precio: 0, existencia: 0 }, []).valido).toBe(true);
    });

    test("rechaza código vacío", () => {
        expect(validarProducto({ ...valido, codigo: "" }, []).valido).toBe(false);
    });

    test("rechaza código repetido", () => {
        const lista = [{ codigo: "111", nombre: "x", precio: 1, existencia: 1 }];
        expect(validarProducto(valido, lista).valido).toBe(false);
    });

    test("rechaza nombre vacío o en blanco", () => {
        expect(validarProducto({ ...valido, nombre: "" }, []).valido).toBe(false);
        expect(validarProducto({ ...valido, nombre: "   " }, []).valido).toBe(false);
    });

    test("rechaza precio negativo o no numérico", () => {
        expect(validarProducto({ ...valido, precio: -1 }, []).valido).toBe(false);
        expect(validarProducto({ ...valido, precio: "10" }, []).valido).toBe(false);
        expect(validarProducto({ ...valido, precio: NaN }, []).valido).toBe(false);
    });

    test("rechaza existencia negativa o decimal", () => {
        expect(validarProducto({ ...valido, existencia: -1 }, []).valido).toBe(false);
        expect(validarProducto({ ...valido, existencia: 1.5 }, []).valido).toBe(false);
    });

    test("devuelve un mensaje de error cuando es inválido", () => {
        expect(typeof validarProducto({ ...valido, codigo: "" }, []).error).toBe("string");
    });
});
