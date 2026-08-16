import { createBrowserRouter, Navigate } from 'react-router-dom'
import { requireAuth } from './auth/requireAuth'
import ErrorPage from './pages/ErrorPage.tsx'
import HomePage from './pages/HomePage.tsx'
import LoginPage from './pages/LoginPage.tsx'

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/home', element: <HomePage />, loader: requireAuth },
  { path: '/error', element: <ErrorPage /> },
])
