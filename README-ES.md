# BuildMas – Plataforma de Presupuestos de Construcción

## Descripción General del Proyecto

BuildMas es una aplicación web full-stack diseñada para gestionar presupuestos de construcción y clientes. Permite a los usuarios (constructores, contratistas) crear y administrar una cartera de clientes, y generar presupuestos detallados para cada uno, incluyendo costos de mano de obra y materiales. La aplicación cuenta con un sistema de autenticación y roles, con una vista de administrador para supervisar la actividad de la plataforma.

Este repositorio contiene dos versiones principales de la aplicación en ramas separadas:

*   **`main`**: La versión de producción, que utiliza **Firebase Authentication** para un manejo de usuarios real.
*   **`mock`**: Una versión de desarrollo local que utiliza un sistema de **autenticación simulada (mock)** para agilizar las pruebas y el desarrollo sin necesidad de servicios en la nube.

---

## Tecnologías Utilizadas

*   **Backend:**
    *   Node.js
    *   Express.js
    *   TypeScript
    *   PostgreSQL
    *   Drizzle ORM
*   **Frontend:**
    *   React
    *   Vite
    *   TypeScript
    *   Material-UI (MUI)
*   **Autenticación:**
    *   Firebase Authentication (en la rama `main`)
    *   Autenticación Simulada (en la rama `mock`)
*   **Contenerización:**
    *   Docker
    *   Docker Compose

---

## Configuración y Ejecución

### Requisitos Previos

*   Docker y Docker Compose instalados.
*   Git instalado.
*   Node.js y npm (para la gestión de dependencias locales).

### Versión de Desarrollo (Rama `mock`)

Esta versión es la más recomendada para el desarrollo local, ya que no requiere configuración de Firebase y se inicia rápidamente.

1.  **Clonar el Repositorio:**
    ```bash
    git clone <url_del_repositorio>
    cd devbuildmas
    ```

2.  **Cambiar a la Rama `mock`:**
    ```bash
    git checkout mock
    ```

3.  **Instalar Dependencias Locales:**
    *   Esto es necesario para que tu editor de código reconozca los paquetes y para la gestión de Git.
    ```bash
    npm install
    cd frontend && npm install
    cd ../backend && npm install
    cd ..
    ```

4.  **Levantar los Contenedores:**
    *   Este comando construirá las imágenes de Docker y ejecutará la aplicación completa (frontend, backend y base de datos).
    ```bash
    sudo docker compose up --build -d
    ```

5.  **Acceder a la Aplicación:**
    *   **Frontend:** Abre tu navegador y ve a `http://localhost`.
    *   **Backend:** La API estará disponible en `http://localhost:3001`.

6.  **Iniciar Sesión (Simulado):**
    *   La página de login tendrá valores por defecto. Simplemente haz clic en "Sign In" para acceder a la aplicación.

### Versión de Producción (Rama `main`)

Esta versión utiliza servicios reales de Firebase y requiere una configuración adicional.

1.  **Cambiar a la Rama `main`:**
    ```bash
    git checkout main
    ```

2.  **Configuración de Firebase:**
    *   Crea un proyecto en la [Consola de Firebase](https://console.firebase.google.com/).
    *   Habilita **Authentication** con el proveedor de **Email/Password**.
    *   **Frontend:** Obtén tu objeto de configuración `firebaseConfig` y pégalo en el archivo `frontend/src/firebase.ts`.
    *   **Backend:** Ve a "Project settings" > "Service accounts", genera una nueva clave privada y guarda el archivo JSON como `backend/serviceAccountKey.json`.

3.  **Configuración de Variables de Entorno:**
    *   En el archivo `backend/.env`, asegúrate de que la variable `ADMIN_UID` esté configurada con el UID del usuario que será el administrador.

4.  **Levantar los Contenedores:**
    ```bash
    sudo docker compose up --build -d
    ```

5.  **Acceder a la Aplicación:**
    *   Ve a `http://localhost` y regístrate o inicia sesión con un usuario de Firebase.

---

## Notas de Implementación Relevantes

*   **Persistencia de Datos:** Se creó una tabla para almacenar la información.
*   **Lógica de Estados:** El estado de un presupuesto (`initiated`, `in progress`, `completed`) se calcula y asigna automáticamente en el backend cada vez que se crea o actualiza, asegurando la consistencia de los datos.
*   **Seguridad de la API:** Las rutas de la API están protegidas. El backend valida un token (real o simulado) en cada petición para identificar al usuario y asegurar que solo pueda acceder a sus propios datos.
*   **Entorno Dockerizado:** Toda la aplicación está containerizada, lo que garantiza un entorno de desarrollo consistente y facilita el despliegue.
