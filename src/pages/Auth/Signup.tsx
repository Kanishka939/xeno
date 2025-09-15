import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../state/auth'
import { useData } from '../../state/data'
import Card from '../../ui/Card'

export default function Signup() {
  const { signup, attachTenantToCurrentUser } = useAuth()
  const { createTenant } = useData()
  const [name, setName] = useState('Demo User')
  const [email, setEmail] = useState('demo@xeno.app')
  const [password, setPassword] = useState('demo123')
  const [err, setErr] = useState<string | null>(null)
  const nav = useNavigate()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setErr(null)
    try {
      await signup(email, password, name)
      const t = createTenant('Demo Store')
      attachTenantToCurrentUser(t.id)
      nav(`/tenant/${t.id}/connect`, { replace: true })
    } catch (e: any) {
      setErr(e.message || 'Signup failed')
    }
  }

  return (
    <div className="container max-w-md mt-16">
      <Card title="Create your account" subtitle="Local-only demo auth">
        <form onSubmit={submit} className="space-y-3">
          <div><label className="label">Full name</label><input className="input" value={name} onChange={e => setName(e.target.value)} placeholder="Jane Doe" /></div>
          <div><label className="label">Email</label><input className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /></div>
          <div><label className="label">Password</label><input type="password" className="input" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" /></div>
          {err && <div className="text-rose-600 text-sm">{err}</div>}
          <button className="btn btn-primary w-full">Create account</button>
        </form>
        <div className="text-sm text-slate-600 mt-3">Already have an account? <Link to="/login" className="text-sky-600 hover:underline">Sign in</Link></div>
      </Card>
    </div>
  )
}
