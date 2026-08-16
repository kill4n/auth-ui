import { Link, useLocation } from 'react-router-dom'

type ErrorState = { reason?: 'invalid-credentials' | 'unauthorized' }

export default function ErrorPage() {
  const location = useLocation()
  const state = location.state as ErrorState | null
  const reason = state?.reason ?? 'unauthorized'
  const isInvalidCredentials = reason === 'invalid-credentials'

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-96 rounded-2xl border border-line bg-surface p-8">
        <h1 className="m-0 text-2xl font-semibold text-heading">
          {isInvalidCredentials ? 'Invalid credentials' : 'Unauthorized'}
        </h1>
        <p className="mt-2 text-sm text-ink">
          {isInvalidCredentials
            ? 'The email or password is incorrect. Please try again.'
            : 'You do not have access to this page. Please sign in again to continue.'}
        </p>
        <Link
          to="/login"
          className="mt-6 inline-flex items-center justify-center rounded-lg border border-line px-4 py-2.5 text-sm font-semibold text-heading transition hover:bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          Back to login
        </Link>
      </div>
    </main>
  )
}
