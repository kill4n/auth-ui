import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import type { Permissions } from '../auth/authService'
import Button from '../components/Button.tsx'

const permissionList: { key: keyof Permissions; label: string }[] = [
  { key: 'CanCreateWorkspace', label: 'Create workspaces' },
  { key: 'CanViewWorkspace', label: 'View workspaces' },
  { key: 'CanEditWorkspace', label: 'Edit workspaces' },
  { key: 'CanDeleteWorkspace', label: 'Delete workspaces' },
  { key: 'CanCreateProjects', label: 'Create projects' },
  { key: 'CanViewProjects', label: 'View projects' },
  { key: 'CanEditProjects', label: 'Edit projects' },
  { key: 'CanDeleteProjects', label: 'Delete projects' },
  { key: 'CanManageUsers', label: 'Manage users' },
]

export default function HomePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <main className="flex flex-1 flex-col items-center px-6 py-12">
      <div className="w-full max-w-3xl">
        <div className="mb-6 text-center">
          <h1 className="m-0 text-2xl font-semibold text-heading">
            {user ? `Welcome, ${user.name}` : 'Welcome'}
          </h1>
          {user && <p className="mt-1.5 text-sm text-ink">{user.email}</p>}
        </div>

        {user && (
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="m-0 text-lg font-semibold text-heading">Permissions</h2>
              <Button type="button" onClick={handleLogout} className="px-4 py-2">
                Log out
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {permissionList.map(({ key, label }) => {
                const granted = user.permissions[key]
                return (
                  <div key={key} className="rounded-xl border border-line bg-surface p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-heading">{label}</span>
                      <span
                        className={
                          granted
                            ? 'inline-flex shrink-0 items-center rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent-strong'
                            : 'inline-flex shrink-0 items-center rounded-full border border-line px-2 py-0.5 text-xs font-semibold text-ink/60'
                        }
                      >
                        {granted ? 'Granted' : 'Denied'}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-ink/70">{key}</p>
                  </div>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
