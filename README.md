|-- backend
| |-- node_modules
| |-- src
| | |-- config
| | | |-- .env.example
| | | |-- configDB.js
| | | |-- configEnv.js
| | | |-- initSetup.js
| | |-- constants
| | |-- controllers
| | |-- middlewares
| | | |-- authentication.middleware.js
| | | |-- authorization.middleware.js
| | |-- models
| | |-- routes
| | | |-- auth.routes.js
| | | |-- index.routes.js
| | | |-- user.routes.js
| | |-- schema
| | |-- services
| | |-- utils
| | |-- index.js
| |-- .gitignore
| |-- package-lock.json
| |-- package.json
| |-- README.md
|-- nodemon.json

## Explicaciones Detalladas

- **backend**: Contiene todo el código y dependencias del backend del proyecto.
- **node_modules**: Carpeta generada automáticamente donde se instalan las dependencias del proyecto.
- **src**: Carpeta principal del código fuente del proyecto.
  - **config**: Configuraciones necesarias para que el proyecto funcione correctamente.
    - **.env.example**: Plantilla para el archivo de variables de entorno, que no se debe incluir en el control de versiones.
    - **configDB.js**: Archivo que contiene la configuración para conectarse a la base de datos.
    - **configEnv.js**: Archivo que carga las variables de entorno desde un archivo .env.
    - **initSetup.js**: Archivo que ejecuta configuraciones iniciales, como la creación de roles predeterminados.
  - **constants**: Carpeta para almacenar constantes que se utilizan en todo el proyecto.
  - **controllers**: Carpeta que contiene la lógica de negocio para las rutas.
  - **middlewares**: Carpeta que contiene funciones que se ejecutan entre la petición del usuario y la respuesta del servidor.
    - **authentication.middleware.js**: Middleware que verifica si el usuario está autenticado.
    - **authorization.middleware.js**: Middleware que verifica si el usuario tiene permisos para acceder a ciertos recursos.
  - **models**: Carpeta que contiene los modelos de datos de la aplicación, utilizados para interactuar con la base de datos.
  - **routes**: Carpeta que define las rutas de la API y las conecta con los controladores.
    - **auth.routes.js**: Define las rutas para la autenticación (por ejemplo, login, registro).
    - **index.routes.js**: Archivo principal que agrupa todas las rutas del proyecto.
    - **user.routes.js**: Define las rutas para la gestión de usuarios.
  - **schema**: Carpeta para los esquemas de validación de datos.
  - **services**: Carpeta que contiene la lógica de negocio que es independiente de las rutas.
  - **utils**: Carpeta que contiene funciones auxiliares y utilidades.
  - **index.js**: Archivo principal que inicia la aplicación backend.
- **.gitignore**: Archivo que especifica qué archivos o carpetas deben ser ignorados por Git.
- **package-lock.json**: Archivo que asegura que las mismas versiones de los paquetes se instalen en todos los entornos.
- **package.json**: Archivo que contiene la información del proyecto y las dependencias necesarias.
- **README.md**: Archivo de documentación que describe el proyecto, cómo instalarlo y cómo usarlo.
- **nodemon.json**: Archivo de configuración para nodemon, una herramienta que reinicia automáticamente el servidor cuando detecta cambios en los archivos.

## Funciones Actuales del Backend

1. **Registro de Usuarios**:
   - Permite a los nuevos usuarios registrarse proporcionando un nombre de usuario, correo electrónico, contraseña y roles.
   - Verifica que el correo electrónico no esté ya registrado.
   - Almacena la contraseña de forma segura utilizando hashing (bcrypt).

2. **Autenticación de Usuarios**:
   - Permite a los usuarios registrados iniciar sesión proporcionando su correo electrónico y contraseña.
   - Genera y devuelve un token JWT (JSON Web Token) que se utiliza para autenticar futuras solicitudes.

3. **Gestión de Usuarios**:
   - Permite obtener una lista de todos los usuarios registrados (requiere autenticación y permisos de administrador).
   - Permite obtener los detalles de un usuario específico por su ID.
   - Permite actualizar la información de un usuario (requiere autenticación y permisos de administrador).
   - Permite eliminar un usuario (requiere autenticación y permisos de administrador).

4. **Middlewares de Seguridad**:
   - **Autenticación**: Middleware que verifica si un usuario está autenticado antes de permitirle acceder a ciertas rutas.
   - **Autorización**: Middleware que verifica si un usuario tiene los permisos necesarios para realizar ciertas acciones, como crear, actualizar o eliminar usuarios.

## Rutas Principales y Sus Funcionalidades

1. **Rutas de Autenticación (auth.routes.js)**:
   - `POST /api/auth/login`: Inicia sesión de un usuario existente y devuelve un token JWT.
   - `POST /api/auth/logout`: Cierra la sesión de un usuario (si está implementado).
   - `GET /api/auth/refresh`: Refresca el token JWT (si está implementado).

2. **Rutas de Usuario (user.routes.js)**:
   - `POST /api/users/register`: Registra un nuevo usuario.
   - `GET /api/users`: Obtiene una lista de todos los usuarios (requiere autenticación y permisos de administrador).
   - `GET /api/users/:id`: Obtiene los detalles de un usuario específico por su ID.
   - `PUT /api/users/:id`: Actualiza la información de un usuario (requiere autenticación y permisos de administrador).
   - `DELETE /api/users/:id`: Elimina un usuario (requiere autenticación y permisos de administrador).

## Flujo de Trabajo

1. **Registro de Usuario**:
   - Un nuevo usuario envía una solicitud `POST` a `/api/users/register` con su información.
   - El backend verifica que el correo electrónico no esté ya registrado.
   - La contraseña se cifra y se almacena junto con el resto de la información del usuario en la base de datos MongoDB.

2. **Inicio de Sesión**:
   - Un usuario existente envía una solicitud `POST` a `/api/auth/login` con su correo electrónico y contraseña.
   - El backend verifica las credenciales del usuario.
   - Si las credenciales son correctas, se genera un token JWT y se devuelve al usuario.

3. **Protección de Rutas**:
   - Las rutas protegidas utilizan el middleware de autenticación para verificar que el usuario tenga un token JWT válido antes de permitir el acceso.
   - Las acciones que requieren permisos especiales (como actualizar o eliminar usuarios) utilizan el middleware de autorización para verificar que el usuario tenga los permisos necesarios.

## Herramientas y Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para el backend.
- **Express**: Framework para crear aplicaciones web y APIs.
- **MongoDB**: Base de datos NoSQL utilizada para almacenar la información de los usuarios.
- **Mongoose**: Biblioteca de modelado de datos de MongoDB para Node.js.
- **bcryptjs**: Biblioteca para hashing de contraseñas.
- **jsonwebtoken**: Biblioteca para generar y verificar tokens JWT.
- **dotenv**: Biblioteca para cargar variables de entorno desde un archivo .env.
- **nodemon**: Herramienta que reinicia automáticamente el servidor cuando se detectan cambios en los archivos.

