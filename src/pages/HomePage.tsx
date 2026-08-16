import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function HomePage() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <main
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        padding: '48px 24px',
      }}
    >
      <p>Welcome</p>
      <button
        type="button"
        onClick={handleLogout}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        style={{
          padding: '12px 16px',
          fontSize: '16px',
          fontWeight: 600,
          fontFamily: 'var(--sans)',
          color: 'var(--bg)',
          backgroundColor: 'var(--accent)',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          filter: isButtonHovered ? 'brightness(0.92)' : undefined,
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent',
          transition: 'filter 120ms ease',
        }}
      >
        Log out
      </button>
    </main>
  )
}
