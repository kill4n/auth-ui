import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import Button from '../components/Button.tsx'

const inputClass =
  'w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm text-heading placeholder:text-ink/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 transition-colors duration-150'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-96 rounded-2xl border border-line bg-surface p-8 shadow-sm">
        <h1 className="m-0 text-2xl font-semibold text-heading">Sign in</h1>
        <p className="mt-1.5 text-sm text-ink">Enter your credentials to continue.</p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-heading">
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
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-heading">
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
              className={inputClass}
            />
          </div>

          <Button type="submit" disabled={isSubmitting} aria-live="polite" className="w-full py-3">
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
      </div>
    </main>
  )
}
