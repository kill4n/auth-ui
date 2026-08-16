import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import Button from '../components/Button.tsx'

export default function HomePage() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-5 px-6 py-12">
      <h1 className="m-0 text-2xl font-semibold text-heading">Welcome</h1>
      <Button type="button" onClick={handleLogout} className="px-5 py-2.5">
        Log out
      </Button>
    </main>
  )
}
