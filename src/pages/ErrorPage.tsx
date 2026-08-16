import { Link, useLocation } from 'react-router-dom'

type ErrorState = { reason?: 'invalid-credentials' | 'unauthorized' }

export default function ErrorPage() {
  const location = useLocation()
  const state = location.state as ErrorState | null
  const reason = state?.reason ?? 'unauthorized'
  const isInvalidCredentials = reason === 'invalid-credentials'

  return (
    <main
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        padding: '48px 24px',
      }}
    >
      <h1 style={{ margin: 0, fontSize: '40px' }}>
        {isInvalidCredentials ? 'Invalid credentials' : 'Unauthorized'}
      </h1>
      <p style={{ color: 'var(--text)', maxWidth: '420px' }}>
        {isInvalidCredentials
          ? 'The email or password is incorrect. Please try again.'
          : 'You do not have access to this page. Please sign in again to continue.'}
      </p>
      <Link
        to="/login"
        style={{
          marginTop: '8px',
          color: 'var(--accent)',
          fontWeight: 600,
          textDecoration: 'underline',
          textUnderlineOffset: '2px',
        }}
      >
        Back to login
      </Link>
    </main>
  )
}
