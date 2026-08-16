import { getToken } from './tokenStorage'

export interface Permissions {
  CanCreateWorkspace: boolean
  CanViewWorkspace: boolean
  CanEditWorkspace: boolean
  CanDeleteWorkspace: boolean
  CanCreateProjects: boolean
  CanViewProjects: boolean
  CanEditProjects: boolean
  CanDeleteProjects: boolean
  CanManageUsers: boolean
}

export interface PublicUser {
  id: string
  email: string
  name: string
  role: string
  permissions: Permissions
}

export interface LoginResponse {
  token: string
  user: PublicUser
}

const LOGIN_URL = '/api/v1/auth/login'
const ME_URL = '/api/v1/auth/me'

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(LOGIN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as { error?: string }
    throw { error: data.error ?? 'Error de autenticación' }
  }

  return (await response.json()) as LoginResponse
}

export async function getMe(): Promise<PublicUser> {
  const token = getToken()
  if (token === null) {
    throw new Error('No hay sesión activa')
  }

  const response = await fetch(ME_URL, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error('No autorizado')
  }

  const data = (await response.json()) as { user: PublicUser }
  return data.user
}
