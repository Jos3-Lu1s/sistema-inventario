# Changelog

Todos los cambios notables de este proyecto se documentarán en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/),
y este proyecto sigue [Semantic Versioning](https://semver.org/lang/es/).

## [1.1.0] - 2026-11-17

### Agregado

- Pie de página en `index.html` que muestra la versión desplegada (`Versión 1.1.0`), con estilo `.pie` en `src/estilos.css`.
- Workflow de despliegue en GitHub Pages (`.github/workflows/deploy.yml`) a partir del paquete publicado en GitHub Releases.

### Problema conocido

- `index.html` carga el módulo `./src/app.js`, que no existe, así que la aplicación no responde (no se pueden registrar productos). El fallo es intencional: sirve para la demostración de recuperación de la versión anterior en la práctica de despliegue. Se corrige en `1.1.1`.

## [1.0.2] - 2026-11-17

### Corregido

- Restaurado el formato de precio en `src/detalle.js` (`Precio: ${producto.precio}`) tras la demostración de bloqueo en el workflow de liberación (`v1.0.1-test`).

### Agregado

- Documentación en `README.md` sobre la validación de bloqueo en el workflow de liberación ante fallos de pruebas.
- Archivo `CHANGELOG.md` para el registro de versiones.

## [1.0.0] - 2026-11-17

### Agregado

- Sistema web de gestión de inventarios (`index.html` y `src/`) con alta, detalle y búsqueda de productos.
- Suite de pruebas unitarias con Jest y reporter personalizado (`reporters/reporte-pruebas.js`).
- Workflows de GitHub Actions: CI (`.github/workflows/ci.yml`), pruebas automatizadas (`.github/workflows/tests.yml`) y liberación de paquete de producción (`.github/workflows/release.yml`).
- Actualización de `.gitignore` para excluir archivos de entorno, dependencias, IDE y paquetes `.zip`.
