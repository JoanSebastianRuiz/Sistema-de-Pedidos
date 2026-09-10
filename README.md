# Sistema de pedidos

Sistema web para la **gestión de productos y pedidos**, desarrollado como una aplicación cliente-servidor. Permite a los clientes consultar los productos disponibles, realizar pedidos y consultar su estado, mientras que los administradores pueden gestionar los productos y administrar los pedidos recibidos.

El proyecto está diseñado con una arquitectura modular y preparada para ejecutarse en un entorno cloud, permitiendo escalar horizontalmente el backend mediante múltiples instancias.

## ✨ Funcionalidades

### Cliente

* Registro de usuarios.
* Inicio y cierre de sesión.
* Consulta de productos disponibles.
* Creación de pedidos seleccionando uno o varios productos.
* Cálculo automático del total del pedido.
* Consulta del historial de pedidos.
* Consulta del estado de los pedidos.
* Cancelación de pedidos que todavía no hayan sido preparados.

### Administrador

* Gestión de productos.

  * Crear productos.
  * Modificar productos.
  * Eliminar productos.
* Consulta de todos los pedidos.
* Actualización del estado de los pedidos.
* Acceso restringido a funcionalidades administrativas mediante roles.

Las funcionalidades implementadas se basan en los requisitos funcionales definidos para el sistema.

## 🏗️ Arquitectura

El sistema utiliza una arquitectura cliente-servidor compuesta principalmente por:

```text
┌──────────────────────┐
│       Cliente        │
│   Navegador Web      │
└──────────┬───────────┘
           │
           │ HTTPS / REST API
           ▼
┌──────────────────────┐
│      Frontend        │
│        React         │
└──────────┬───────────┘
           │
           │ REST
           ▼
┌──────────────────────┐
│    Backend NestJS    │
│                      │
│ Controllers          │
│ Services             │
│ Repositories         │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│       Supabase       │
│     PostgreSQL       │
└──────────────────────┘
```

La aplicación utiliza React para el frontend, NestJS para el backend, PostgreSQL mediante Supabase para la persistencia y una API REST para la comunicación entre frontend y backend.

El backend puede ejecutarse mediante múltiples instancias detrás de un balanceador de carga, permitiendo aumentar la capacidad del sistema conforme crece la demanda.

## 🛠️ Tecnologías

### Frontend

* React
* Vite
* Material UI
* Formik
* Yup
* Zustand
* React Query

### Backend

* NestJS
* TypeScript
* Drizzle ORM
* PostgreSQL
* Supabase
* JWT

### Comunicación y despliegue

* API REST
* HTTPS
* Arquitectura cloud
* Escalabilidad horizontal

## 📦 Estructura del proyecto

```text
Sistema-de-Pedidos/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── stores/
│   │   ├── services/
│   │   └── ...
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── products/
│   │   │   └── orders/
│   │   ├── database/
│   │   ├── shared/
│   │   └── main.ts
│   └── package.json
│
└── README.md
```

La organización modular del backend permite separar responsabilidades y facilitar el mantenimiento y evolución del sistema, de acuerdo con los requisitos de arquitectura definidos para el proyecto.

## 🚀 Instalación

### Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

* Node.js
* npm
* PostgreSQL/Supabase
* Git

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd Sistema-de-Pedidos
```

### 2. Instalar dependencias del frontend

```bash
cd client
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` dentro de `client/` con las variables necesarias para conectarse al backend.

Ejemplo:

```env
VITE_API_URL=http://localhost:3005/api
```

### 4. Instalar dependencias del backend

```bash
cd ../server
npm install
```

Crea el archivo `.env` correspondiente al backend.

Ejemplo:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
PORT=3005
```

> No incluyas credenciales reales ni archivos `.env` dentro del repositorio.

### 5. Ejecutar el backend

Desde `server/`:

```bash
npm run start:dev
```

### 6. Ejecutar el frontend

Desde `client/`:

```bash
npm run dev
```

La aplicación estará disponible en la URL indicada por Vite.

## 🔐 Seguridad

El sistema contempla diferentes mecanismos para proteger el acceso a la aplicación:

* Autenticación de usuarios.
* Autorización mediante roles.
* Protección de funcionalidades administrativas.
* Credenciales almacenadas de forma segura.
* Comunicación mediante API REST.
* Variables sensibles mediante variables de entorno.

Las funcionalidades administrativas están restringidas a usuarios con rol de administrador, y las credenciales no deben almacenarse en texto plano.

## 📊 Modelo de dominio

Las principales entidades del sistema son:

```text
User
 │
 └── Order
       │
       └── OrderDetail
               │
               └── Product
```

El sistema utiliza las entidades principales `User`, `Product`, `Order` y `OrderDetail`, complementadas por los enumerados `Role` y `OrderStatus`.

## 🎯 Patrones de diseño

El proyecto utiliza diferentes patrones para mantener una arquitectura modular y facilitar la reutilización del código.

### Service Pattern

Se utiliza en el backend para separar la lógica de negocio de los controladores HTTP.

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

### Repository Pattern

Abstrae el acceso a la base de datos y reduce el acoplamiento entre la lógica de negocio y la infraestructura de persistencia.

### Component Pattern

Se utiliza en React para dividir la interfaz en componentes pequeños, reutilizables e independientes.

### Custom Hook Pattern

Permite encapsular lógica reutilizable relacionada con el estado y comportamiento de los componentes de React.

Estos patrones buscan mejorar la modularidad, mantenibilidad y escalabilidad del sistema.

## 📋 Alcance

El proyecto contempla:

* Gestión de usuarios.
* Gestión de productos.
* Gestión de pedidos.
* Consulta del estado de los pedidos.
* Actualización del estado de los pedidos.
* Panel administrativo.
* Persistencia de información.
* Arquitectura preparada para escalabilidad horizontal.

## 🚫 Fuera del alcance

Las siguientes funcionalidades no forman parte del proyecto:

* Pagos en línea.
* Sistema de domicilios.
* Geolocalización.
* Chat entre usuarios y administradores.
* Cupones o descuentos.
* Integración con WhatsApp.
* Arquitectura basada en microservicios.
* Aplicación móvil nativa.
* Carrito de compras.

> El pedido se crea seleccionando directamente los productos que lo componen; **no se implementó un carrito de compras independiente**.

## 📐 Requisitos no funcionales

El sistema fue diseñado considerando:

* Tiempo de respuesta objetivo de hasta 2 segundos bajo condiciones normales.
* Disponibilidad durante el horario de operación.
* Protección de credenciales.
* Control de acceso por roles.
* Escalabilidad horizontal.
* Backend modular.
* Persistencia de pedidos ante reinicios.
* Interfaz usable desde dispositivos de escritorio y móviles.

## 👨‍💻 Estado del proyecto

**Estado:** Proyecto académico / en desarrollo.

El sistema implementa las funcionalidades principales relacionadas con usuarios, productos y pedidos, siguiendo los requisitos y la arquitectura planteada para el proyecto.

## 📄 Licencia

Este proyecto fue desarrollado con fines académicos.
