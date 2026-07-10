# proyecto_final_talento_tech

API REST para administrar productos con autenticación JWT y persistencia en Firestore.

## Instalación

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con estas variables:

```bash
API_KEY=
AUTH_DOMAIN=
PROJECT_ID=
STORAGE_BUCKET=
MESSAGING_SENDER_ID=
APP_ID=
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
JWT_SECRET=
JWT_EXPIRES_IN=
PORT=
```

También podés copiar el archivo `.env-example` y completarlo con tus valores.

## Ejecución

```bash
npm start
```

Para desarrollo:

```bash
npm run dev
```

## Endpoints

### Autenticación

- `POST /api/auth/login`

### Productos

- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products/create`
- `DELETE /api/products/:id`

## Autenticación

Las rutas de productos requieren un token `Bearer` obtenido desde `/api/auth/login`.

Credenciales por defecto, si no se configuran variables de entorno:

- email: `user@email.com`
- contraseña: `strongPass123`

## Ejemplo de uso

```bash
curl -X POST http://localhost:3001/api/auth/login \
	-H "Content-Type: application/json" \
	-d '{"email":"user@email.com","password":"strongPass123"}'
```

Con el token devuelto, podés consultar los productos así:

```bash
curl http://localhost:3001/api/products \
	-H "Authorization: Bearer TU_TOKEN"
```
