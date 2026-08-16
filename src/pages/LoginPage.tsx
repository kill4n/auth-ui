import { useState, type CSSProperties, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState<'email' | 'password' | null>(null)
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      await login(email, password)
      navigate('/home')
    } catch {
      navigate('/error', { state: { reason: 'invalid-credentials' } })
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputStyle = (field: 'email' | 'password'): CSSProperties => ({
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px 12px',
    fontSize: '16px',
    fontFamily: 'var(--sans)',
    color: 'var(--text-h)',
    backgroundColor: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    transition: 'border-color 120ms ease',
    borderColor: focusedField === field ? 'var(--accent)' : undefined,
  })

  const labelStyle: CSSProperties = {
    display: 'block',
    marginBottom: '6px',
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--text)',
  }

  return (
    <main
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: '360px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          textAlign: 'left',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '32px' }}>Sign in</h1>

        <div>
          <label htmlFor="email" style={labelStyle}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            spellCheck={false}
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            style={inputStyle('email')}
          />
        </div>

        <div>
          <label htmlFor="password" style={labelStyle}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
            style={inputStyle('password')}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          aria-live="polite"
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
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            filter: isButtonHovered && !isSubmitting ? 'brightness(0.92)' : undefined,
            opacity: isSubmitting ? 0.7 : 1,
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
            transition: 'filter 120ms ease, opacity 120ms ease',
          }}
        >
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  )
}
