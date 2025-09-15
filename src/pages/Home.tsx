import { Link, useNavigate } from 'react-router-dom'
import Card from '../ui/Card'
import { useAuth } from '../state/auth'
import { useData } from '../state/data'
import { useEffect, useRef } from 'react'

export default function Home() {
  const { currentUser } = useAuth()
  const { tenantsForCurrentUser, currentTenant, createTenant } = useData()
  const nav = useNavigate()

  const ranRef = useRef(false)
  useEffect(() => {
    if (ranRef.current) return
    if (!currentUser) return
    ranRef.current = true
    const ts = tenantsForCurrentUser()
    if (ts.length === 0) {
      const t = createTenant('Demo Store')
      nav(`/tenant/${t.id}/connect`, { replace: true })
      return
    }
    if (currentTenant) {
      const target = `/tenant/${currentTenant.id}/insights`
      if (location.pathname !== target) nav(target, { replace: true })
    }
  }, [currentUser, currentTenant])

  if (!currentUser) {
    return (
      <div className="container max-w-2xl mt-16">
        <Card title="Welcome to Xeno Insights" subtitle="Please sign in to continue">
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-outline">Login</Link>
            <Link to="/signup" className="btn btn-primary">Sign up</Link>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Card title="Redirecting…" subtitle="Taking you to your tenant's insights..." />
    </div>
  )
}
