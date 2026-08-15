export interface PublicUser {
  id: string
  email: string
  role: string
  permissions: string[]
}

export interface LoginResponse {
  token: string
  user: PublicUser
}

const VALID_EMAIL = 'admin@test.com'
const VALID_PASSWORD = 'admin123'
const LATENCY_MS = 300

export function login(email: string, password: string): Promise<LoginResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        resolve({
          token: 'fake-jwt-token.admin@test.com',
          user: {
            id: '1',
            email: VALID_EMAIL,
            role: 'admin',
            permissions: ['home:read'],
          },
        })
      } else {
        reject({ error: 'Credenciales inválidas' })
      }
    }, LATENCY_MS)
  })
}
