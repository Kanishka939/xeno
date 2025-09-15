import { useData } from '../state/data'
import { useNavigate } from 'react-router-dom'

export default function TenantSwitch() {
  const { tenantsForCurrentUser, currentTenant, setCurrentTenant } = useData()
  const nav = useNavigate()
  if (!currentTenant) return null
  return (
    <div className="ml-4">
      <select className="input" value={currentTenant.id} onChange={(e) => { setCurrentTenant(e.target.value); nav(`/tenant/${e.target.value}/insights`) }}>
        {tenantsForCurrentUser().map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
      </select>
    </div>
  )
}
