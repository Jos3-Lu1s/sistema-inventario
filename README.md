# sistema-inventario
Sistema web para la gestión de inventarios de un comercio electrónico.

## Desarrollo

Requisito: Node.js 22 (versión fijada en `.nvmrc`).

```bash
npm ci          # instala las dependencias exactas de package-lock.json
npm run lint    # verifica el código con ESLint
npm test        # ejecuta las pruebas con Jest
```

Para ver la aplicación, abre `index.html` con Live Server (puerto 5501). Abrirlo con doble clic (`file://`) no funciona porque el navegador bloquea los ES modules.
