# Auth UI

Frontend de autenticación construido con **React 19 + TypeScript + Vite**.

## Páginas

| Ruta | Descripción |
|---|---|
| `/login` | Form de email + password |
| `/home` | Página protegida, muestra "Welcome" |
| `/error` | Página de error / no autorizado |

Flujo: `/` redirige a `/login`. Credenciales válidas → `/home`. Credenciales inválidas o acceso a `/home` sin sesión → `/error`.

## Credenciales de prueba

El login consulta el backend real (`POST /api/v1/auth/login`). Usuario seed del backend:

```
Email:    demo@demo.com
Password: demo123
```

## Setup

```bash
npm install
npm run dev
```

Abrí `http://localhost:8080`.

### Variables de entorno

Copiá `.env.example` a `.env` y ajustá si hace falta:

```env
UI_PORT=8080
VITE_API_URL=http://localhost:8080
VITE_PROXY_TARGET=http://localhost:3000
```

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Dev server con HMR |
| `npm run build` | Typecheck (`tsc -b`) + build (`vite build`) |
| `npm run lint` | ESLint |
| `npm run preview` | Preview del build |

## Estructura

```
src/
├── auth/              # Core de autenticación
│   ├── authService.ts # Cliente de la API real (login + getMe)
│   ├── tokenStorage.ts# Wrapper de localStorage (key `auth_token`)
│   ├── AuthContext.tsx# Sesión: AuthProvider + useAuth (restaura con /me)
│   └── requireAuth.ts # Loader de ruta protegida (valida token con /me)
├── pages/
│   ├── LoginPage.tsx
│   ├── HomePage.tsx
│   └── ErrorPage.tsx
├── router.tsx         # Definición de rutas (createBrowserRouter)
└── main.tsx           # RouterProvider + AuthProvider
```

## Integración con el backend

La UI consume el backend real vía el proxy de Vite (`/api` → `VITE_PROXY_TARGET`, por defecto `http://localhost:3000`):

- `POST /api/v1/auth/login` — login (`src/auth/authService.ts`)
- `GET /api/v1/auth/me` — restaura la sesión al recargar y valida el token en `requireAuth.ts`

El backend debe estar corriendo en el puerto 3000 (`npm run dev` en `../backend`). Si el token expiró (JWT 1h), el guard limpia la sesión y redirige a `/error`.
