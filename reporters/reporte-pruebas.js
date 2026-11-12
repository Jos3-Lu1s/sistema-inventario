// Reporter de Jest que imprime el resumen de los casos de prueba (CPxx)
// con el formato:
//
//   RESULTADOS DE LAS PRUEBAS
//   CP01 - Crear producto          CORRECTO
//   ...
//   Resultado: 10 de 10 pruebas satisfactorias.
//
// Solo toma en cuenta las pruebas cuyo nombre empieza con "CPnn - ".
// El nombre que se muestra es el texto antes de ":" en el nombre de la prueba.

const PATRON_CASO = /^CP\d+ - /;

const ESTADOS = {
    passed: "CORRECTO",
    failed: "ERROR"
};

export default class ReportePruebas {
    onRunComplete(_contextos, resultados) {
        const casos = resultados.testResults
            .flatMap(archivo => archivo.testResults)
            .filter(prueba => PATRON_CASO.test(prueba.title))
            .map(prueba => ({
                nombre: prueba.title.split(":")[0].trim(),
                estado: ESTADOS[prueba.status] ?? "NO EJECUTADA"
            }))
            .sort((a, b) => a.nombre.localeCompare(b.nombre, "es", { numeric: true }));

        if (casos.length === 0) return;

        const ancho = Math.max(...casos.map(c => c.nombre.length)) + 4;
        const correctas = casos.filter(c => c.estado === "CORRECTO").length;

        const lineas = [
            "",
            "RESULTADOS DE LAS PRUEBAS",
            "",
            ...casos.map(c => c.nombre.padEnd(ancho) + c.estado),
            "",
            `Resultado: ${correctas} de ${casos.length} pruebas satisfactorias.`,
            ""
        ];
        process.stdout.write(lineas.join("\n") + "\n");
    }
}
