import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import Card from '../ui/Card'
import { useData } from '../state/data'

export default function Onboard() {
  const { tenantId } = useParams()
  const { currentTenant, connectShop } = useData()
  const [domain, setDomain] = useState(currentTenant?.shop?.domain ?? 'demo-store.myshopify.com')
  const [token, setToken] = useState(currentTenant?.shop?.token ?? 'shpat_...')
  const nav = useNavigate()

  if (!tenantId) return null

  return (
    <div className="max-w-xl">
      <Card title="Onboard Shopify" subtitle="Enter your shop domain and Admin API access token">
        <div className="space-y-3">
          <div><label className="label">Shop domain</label><input className="input" value={domain} onChange={e => setDomain(e.target.value)} placeholder="your-store.myshopify.com" /></div>
          <div><label className="label">Admin API access token</label><input className="input" value={token} onChange={e => setToken(e.target.value)} placeholder="shpat_..." /></div>
          <div className="flex items-center gap-2">
            <button className="btn btn-primary" onClick={() => { connectShop(tenantId, domain, token); nav(`/tenant/${tenantId}/insights`, { replace: true })}}>Connect</button>
            <Link className="btn btn-outline" to={`/tenant/${tenantId}/insights`}>Skip</Link>
          </div>
          <p className="text-xs text-slate-500">This UI-only build does not call Shopify; the connection state is simulated for demo purposes.</p>
        </div>
      </Card>
    </div>
  )
}
