import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { login as authServiceLogin } from './authService'
import type { PublicUser } from './authService'
import { clearToken, getToken, setToken } from './tokenStorage'

interface AuthContextValue {
  user: PublicUser | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(() => getToken() !== null)

  const login = async (email: string, password: string) => {
    const response = await authServiceLogin(email, password)
    setToken(response.token)
    setUser(response.user)
    setIsAuthenticated(true)
  }

  const logout = () => {
    clearToken()
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
