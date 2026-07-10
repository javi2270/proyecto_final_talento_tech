# proyecto_final_talento_tech

API REST para administrar productos con autenticación JWT y persistencia en Firestore.

## Instalación

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` con estas variables:

```bash
API_KEY=
AUTH_DOMAIN=
PROJECT_ID=
STORAGE_BUCKET=
MESSAGING_SENDER_ID=
APP_ID=
```

## Ejecución

```bash
npm run start
```

## Endpoints

- `POST /auth/login`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products/create`
- `DELETE /api/products/:id`

## Autenticación

Las rutas de productos requieren un token `Bearer` obtenido desde `/auth/login`.
