import { Link } from 'react-router-dom'

export default function ErrorPage() {
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
      <h1 style={{ margin: 0, fontSize: '40px' }}>Unauthorized</h1>
      <p style={{ color: 'var(--text)', maxWidth: '420px' }}>
        You do not have access to this page. Please sign in again to continue.
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
