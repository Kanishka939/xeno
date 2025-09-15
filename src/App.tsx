import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './ui/Navbar'
import { useEffect } from 'react'
import { useAuth } from './state/auth'

export default function App() {
  const { currentUser } = useAuth()
  const nav = useNavigate()
  const loc = useLocation()

  useEffect(() => {
    const authPages = ['/login','/signup','/clear']
    if (!currentUser && !authPages.includes(loc.pathname)) {
      nav('/login', { replace: true })
    }
  }, [currentUser, loc.pathname])

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container py-6">
        <Outlet />
      </main>
    </div>
  )
}
