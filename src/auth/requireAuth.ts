import { redirect } from 'react-router-dom'
import { getToken } from './tokenStorage'

export function requireAuth() {
  if (!getToken()) {
    return redirect('/error')
  }
  return null
}
