import { productos } from "../src/productos.js";

describe("catálogo de productos", () => {
    test("cada producto tiene los cuatro campos con el tipo correcto", () => {
        for (const producto of productos) {
            expect(typeof producto.codigo).toBe("string");
            expect(typeof producto.nombre).toBe("string");
            expect(typeof producto.precio).toBe("number");
            expect(typeof producto.existencia).toBe("number");
        }
    });

    test("los códigos no se repiten", () => {
        const codigos = productos.map(p => p.codigo);
        expect(new Set(codigos).size).toBe(codigos.length);
    });
});
