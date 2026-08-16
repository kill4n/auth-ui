import { redirect } from 'react-router-dom'
import { getMe } from './authService'
import { clearToken, getToken } from './tokenStorage'

export async function requireAuth() {
  const token = getToken()
  if (token === null) {
    return redirect('/error')
  }

  try {
    await getMe()
    return null
  } catch {
    clearToken()
    return redirect('/error')
  }
}
