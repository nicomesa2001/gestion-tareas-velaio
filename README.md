# GestionTareasVelaio

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NgRx](https://img.shields.io/badge/NgRx-BA2BD2?style=for-the-badge&logo=redux&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)

GestionTareasVelaio - desarrollada con Angular 16, utilizando NgRx para la gestión del estado y TailwindCSS para el diseño.

## Características

- 📝 Crear y gestionar tareas
- 👥 Asignar personas a las tareas
- 🔍 Filtrar tareas por estado (completadas, pendientes)
- 🎨 Interfaz de usuario moderna y responsive

## Requisitos previos

- Node.js (versión 14 o superior)
- pnpm (versión 6 o superior)
- Angular CLI (versión 16.2.16)

## Instalación

1. Clona el repositorio:

```

git clone https://github.com/nicomesa2001/gestion-tareas-velaio.git

```

2. Navega al directorio del proyecto:

```

cd gestion-tareas-velaio

```

3. Instala las dependencias usando pnpm:

```

pnpm install

```

## Uso

Para iniciar el servidor de desarrollo:

```

pnpm start

```

Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

## Estructura del proyecto

- `src/app/components`: Componentes de la aplicación
- `src/app/models`: Interfaces y modelos de datos
- `src/app/services`: Servicios para la lógica de negocio
- `src/app/store`: Acciones, reducers y selectores de NgRx
- `src/app/validators`: Validadores personalizados

## Comandos disponibles

- `pnpm start`: Inicia el servidor de desarrollo
- `pnpm build`: Compila la aplicación para producción
- `pnpm test`: Ejecuta las pruebas unitarias
- `pnpm lint`: Ejecuta el linter para verificar el código

Desarrollado por Nicolai Enciso
