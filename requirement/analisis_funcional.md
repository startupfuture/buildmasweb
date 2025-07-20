# Análisis Funcional: BuildMas - Plataforma de Presupuestos de Construcción

## 1. Introducción y Objetivo General

El objetivo del proyecto es desarrollar una aplicación web completa (Full Stack) de tipo SPA (Single Page Application) para la gestión de presupuestos de construcción y clientes. La plataforma permitirá a los usuarios crear, visualizar, editar y eliminar presupuestos y clientes, aplicando reglas de negocio específicas para el cálculo de costos y el manejo de estados.

## 2. Roles de Usuario

Se definen dos roles principales en el sistema:

1.  **Usuario Registrado (Constructor/Contratista):** Es el usuario principal de la aplicación. Puede gestionar su propia cartera de clientes y los presupuestos asociados a cada uno de ellos.
2.  **Administrador:** Tiene una visión global de la plataforma. Puede supervisar a todos los clientes y presupuestos del sistema, así como acceder a un resumen general de la actividad en la plataforma (en borrador).

## 3. Entidades Principales del Sistema

*   **Usuario (User):** Representa a la persona que utiliza la aplicación. Cada usuario tiene sus propias credenciales de acceso y es el propietario de su información de clientes y presupuestos.
*   **Cliente (Client):** Representa al cliente final para quien se realiza un presupuesto. Cada cliente está asociado a un único Usuario.
*   **Presupuesto (Estimate):** Es el documento central de la aplicación. Representa la cotización de un trabajo de construcción y está compuesto por costos de mano de obra y materiales. Cada presupuesto está asociado a un único Cliente.

## 4. Requerimientos Funcionales (RF)

### RF-01: Gestión de Autenticación de Usuarios
*   **Registro de nuevos usuarios:** El sistema debe permitir que una persona se registre en la plataforma proveyendo sus datos básicos.
*   **Inicio de sesión (Login):** Los usuarios registrados deben poder acceder al sistema utilizando sus credenciales.

### RF-02: Gestión de Clientes (CRUD)
*   **Crear Cliente:** Un usuario registrado debe poder añadir nuevos clientes a su cartera.
*   **Leer Clientes:** Un usuario registrado debe poder ver la lista de todos sus clientes.
*   **Actualizar Cliente:** Un usuario registrado debe poder modificar la información de un cliente existente.
*   **Eliminar Cliente:** Un usuario registrado debe poder eliminar a un cliente de su cartera.

### RF-03: Gestión de Presupuestos (CRUD)
*   **Crear Presupuesto:** Un usuario debe poder crear un nuevo presupuesto, asignándole un título, una descripción y asociándolo a uno de sus clientes.
*   **Detalle y Edición de Presupuesto:**
    *   El usuario puede añadir o modificar el **costo de mano de obra**.
    *   El usuario puede añadir, editar o eliminar dinámicamente **líneas de materiales** en el formulario. Cada línea de material debe contener: nombre, cantidad y precio unitario.
*   **Cálculos Automáticos:**
    *   El sistema debe calcular automáticamente el **total por cada línea de material** (cantidad × precio unitario).
    *   El sistema debe calcular automáticamente el **costo total de materiales** (la suma de los totales de todas las líneas de material).
    *   El sistema debe calcular automáticamente el **costo total del presupuesto** (costo de mano de obra + costo total de materiales).
*   **Visualización de Presupuestos:** El usuario debe poder ver una lista de todos sus presupuestos, indicando su estado actual mediante un código de colores.
*   **Eliminar Presupuesto:** El usuario debe poder eliminar un presupuesto existente.

### RF-04: Lógica de Estados del Presupuesto
El estado de un presupuesto debe gestionarse de la siguiente manera, con indicadores visuales de color:

*   **Iniciado (Amarillo):** Estado por defecto al crear un presupuesto.
*   **En Progreso (Naranja):** El sistema cambiará el estado automáticamente a "En Progreso" cuando el presupuesto tenga asignado un cliente, al menos un material con cantidad, y un costo de mano de obra definido.
*   **Completado (Verde):** El usuario puede cambiar manualmente el estado a "Completado", pero únicamente si el presupuesto se encuentra en estado "En Progreso".

### RF-05: Funcionalidades del Administrador
*   **Visualizar todos los clientes:** El administrador puede ver una lista de todos los clientes registrados en la plataforma, sin importar a qué usuario pertenezcan.
*   **Visualizar todos los presupuestos:** El administrador puede ver todos los presupuestos creados en la plataforma.
*   **Ver resumen de la plataforma:** El administrador tiene acceso a una vista de resumen con estadísticas generales (ej: número total de usuarios, clientes, presupuestos).

## 5. Requerimientos No Funcionales (RNF)

*   **RNF-01: Pila Tecnológica Obligatoria:**
    *   **Backend:** Node.js, TypeScript
    *   **Frontend:** React, TypeScript, Vite
    *   **Base de Datos:** PostgreSQL
    *   **ORM:** Drizzle ORM
    *   **Autenticación:** Firebase Authentication
*   **RNF-02: Arquitectura:** La aplicación debe ser una Single Page Application (SPA) con una API REST en el backend que gestione la lógica de negocio y el acceso a datos.
*   **RNF-03: Código:** El código debe ser limpio, modular y bien estructurado para facilitar su mantenimiento y escalabilidad.
