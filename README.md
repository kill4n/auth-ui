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

El login usa un **servicio mock** que replica el contrato del backend (`POST /api/v1/auth/login`):

```
Email:    admin@test.com
Password: admin123
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
│   ├── authService.ts # Mock del login (contrato del backend)
│   ├── tokenStorage.ts# Wrapper de localStorage (key `auth_token`)
│   └── AuthContext.tsx# Sesión: AuthProvider + useAuth
├── components/
│   └── ProtectedRoute.tsx  # Guard de rutas protegidas
├── pages/
│   ├── LoginPage.tsx
│   ├── HomePage.tsx
│   └── ErrorPage.tsx
├── App.tsx            # Definición de rutas
└── main.tsx           # BrowserRouter + AuthProvider
```

## Integración con el backend

El mock en `src/auth/authService.ts` reemplaza a la API real. Cuando se integre el backend (`VITE_PROXY_TARGET` ya apunta a `localhost:3000` y el proxy enruta `/api`), solo hay que cambiar la implementación de `login` por un `fetch` a `POST /api/v1/auth/login` — las páginas y el contexto no cambian.
