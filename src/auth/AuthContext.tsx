import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { getMe, login as authServiceLogin } from './authService'
import type { PublicUser } from './authService'
import { clearToken, getToken, setToken } from './tokenStorage'

interface AuthContextValue {
  user: PublicUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function restoreSession() {
      if (getToken() === null) {
        if (!cancelled) setIsLoading(false)
        return
      }

      try {
        const currentUser = await getMe()
        if (!cancelled) {
          setUser(currentUser)
          setIsAuthenticated(true)
        }
      } catch {
        clearToken()
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    restoreSession()
    return () => {
      cancelled = true
    }
  }, [])

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
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
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
