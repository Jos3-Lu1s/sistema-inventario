# sistema-inventario

[![CI - Verificar proyecto](https://github.com/Jos3-Lu1s/sistema-inventario/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Jos3-Lu1s/sistema-inventario/actions/workflows/ci.yml)

Sistema web para la gestión de inventarios de un comercio electrónico.

## Desarrollo

Requisito: Node.js 22 (versión fijada en `.nvmrc`).

```bash
npm ci          # instala las dependencias exactas de package-lock.json
npm run lint    # verifica el código con ESLint
npm test        # ejecuta las pruebas con Jest
```

Para ver la aplicación, abre `index.html` con Live Server (puerto 5501). Abrirlo con doble clic (`file://`) no funciona porque el navegador bloquea los ES modules.

## Integración continua

El workflow [`.github/workflows/ci.yml`](.github/workflows/ci.yml) ("CI - Verificar proyecto") corre en `ubuntu-latest` con cada push y cada pull request hacia `main`. Sus pasos son: descargar el código, configurar Node.js 22 (desde `.nvmrc`), instalar dependencias con `npm ci`, revisar el código con `npm run lint` y ejecutar las pruebas con `npm test`.

### 1. ¿Qué problema evita la automatización?

Evita que llegue a `main` código roto sin que nadie se dé cuenta. Sin automatización, revisar depende de que cada persona se acuerde de correr el lint y las pruebas antes de subir sus cambios, y eso se olvida o se salta. También evita el "en mi máquina funciona": el workflow instala las dependencias desde cero con las versiones exactas de `package-lock.json` y la versión de Node de `.nvmrc`. Así, un error de configuración local no se esconde.

### 2. ¿Qué diferencia existe entre ejecutar el proyecto manualmente y utilizar GitHub Actions?

| Ejecución manual | GitHub Actions |
| --- | --- |
| Alguien tiene que acordarse de correr `npm run lint` y `npm test`. | Se ejecuta solo en cada push y pull request a `main`. |
| Corre en la computadora de cada desarrollador, con su sistema y sus versiones. | Corre en una máquina limpia (`ubuntu-latest`) con Node 22 y dependencias instaladas con `npm ci`. |
| El resultado solo lo ve quien lo ejecutó. | El resultado queda visible en el pull request, en la pestaña Actions y en el badge del README. |
| Nada impide hacer merge si las pruebas fallan. | El check en rojo avisa antes del merge que algo está mal. |

Los comandos son los mismos en ambos casos. La diferencia es que GitHub Actions los ejecuta siempre, de la misma forma y a la vista de todo el equipo.

### 3. ¿Qué ocurrió cuando introdujeron un error?

Introdujimos errores a propósito para comprobar que la verificación los detecta:

- **Error de lógica:** cambiamos `buscarProducto` para que siempre devolviera `[]`. `npm test` falló porque las pruebas de `tests/busqueda.test.js` esperaban resultados (por ejemplo, que `"coca"` devolviera cocacola). El comando terminó con código de salida 1.
- **Error de código:** agregamos una variable sin usar (`const sinUsar = 1;`) en `src/`. `npm run lint` lo marcó con la regla `no-unused-vars` y terminó con código de salida 1.

En GitHub Actions, un paso que termina con código distinto de 0 detiene el job. Por eso, en un pull request con la variable sin usar, el workflow falla en el paso "Verificar el código con ESLint", no llega a ejecutar las pruebas y el check del pull request aparece en rojo. Ese pull request se cerró sin hacer merge, así que el error nunca llegó a `main`.

### 4. ¿Por qué es conveniente detectar el error inmediatamente?

- **Es más barato de corregir:** el error se ve minutos después de subirlo, cuando el cambio todavía está fresco y es pequeño. Encontrarlo semanas después obliga a buscar entre muchos cambios cuál lo causó.
- **No afecta a los demás:** como se detecta en el pull request, el error no entra a `main` y nadie más trabaja sobre código roto.
- **Señala dónde está el problema:** el workflow indica qué paso falló (lint o pruebas) y el log muestra el archivo y la línea.
- **Da confianza para hacer merge:** si el check está en verde, se sabe que el código pasó el lint y todas las pruebas.
