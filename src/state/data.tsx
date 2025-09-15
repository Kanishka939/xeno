import React, { createContext, useContext, useMemo, useReducer, useEffect } from 'react'
import { addDays, isWithinInterval, parseISO, startOfDay } from 'date-fns'
import { strToSeed, mulberry32 } from '../utils/seed'

export type Tenant = { id: string, name: string, shop?: { domain?: string, token?: string, connected?: boolean } }
export type Product = { id: string, title: string, category: string, price: number }
export type Customer = { id: string, firstName: string, lastName: string, email: string, createdAt: string }
export type Order = { id: string, customerId: string, items: { productId: string, qty: number, price: number }[], total: number, currency: string, financialStatus: 'paid'|'refunded'|'pending'|'voided', processedAt: string }
export type Event = { id: string, type: 'cart_abandoned'|'checkout_started', customerId?: string, createdAt: string }

type State = {
  tenants: Record<string, Tenant>
  datasets: Record<string, { products: Product[], customers: Customer[], orders: Order[], events: Event[] }>
  currentTenantId?: string
}
type Action =
  | { type: 'CREATE_TENANT', name: string, id: string }
  | { type: 'SET_CURRENT_TENANT', id: string }
  | { type: 'CONNECT_SHOP', tenantId: string, domain: string, token: string }

const KEY = 'xeno_ui_data_v4'
const DataCtx = createContext<any>(null)

function randomPick<T>(arr: T[], rnd: () => number) { return arr[Math.floor(rnd() * arr.length)] }
function makeId(prefix: string, rnd: () => number) { return prefix + Math.floor(rnd() * 1e12).toString(36) }
function clamp(n: number, min: number, max: number) { return Math.max(min, Math.min(max, n)) }

function createDemoData(tenantId: string) {
  const seed = strToSeed(tenantId)
  const rnd = mulberry32(seed)
  const categories = ['Apparel','Accessories','Footwear','Electronics','Home','Beauty']
  const productTitles = ['Basic Tee','Performance Hoodie','Slim Jeans','Classic Sneakers','Leather Belt','Socks Pack','Bluetooth Earbuds','Desk Lamp','Scented Candle','Moisture Cream','Denim Jacket','Running Shorts','Backpack','Sunglasses','Smart Watch','Coffee Maker','Throw Pillow','Face Serum','Windbreaker','Yoga Mat','Wireless Charger','Ceramic Mug','Hand Cream','Graphic Tee','Beanie Hat','Sandals','Sports Bottle','Charging Cable','Phone Case','Beard Oil']
  const products: Product[] = productTitles.map(t => ({ id: makeId('p_', rnd), title: t, category: randomPick(categories, rnd), price: Math.round((10 + rnd()*190) * 100) / 100 }))

  const firstNames = ['Ava','Liam','Mia','Noah','Olivia','Ethan','Emma','Lucas','Amelia','Arjun','Sara','Ishaan','Sophia','Leo','Aisha','Mateo','Zara','Aarav','Chloe','Kai']
  const lastNames = ['Patel','Shah','Gupta','Singh','Khan','Garcia','Martinez','Kim','Nguyen','Brown','Johnson','Taylor','Williams','Davis','Anderson','Lee','Clark','Lewis','Young','Walker']

  const customers: Customer[] = Array.from({ length: 180 }, () => {
    const firstName = randomPick(firstNames, rnd)
    const lastName = randomPick(lastNames, rnd)
    const email = `${firstName}.${lastName}${Math.floor(rnd()*1000)}@example.com`.toLowerCase()
    const createdAt = addDays(new Date(), -Math.floor(rnd()*300))
    return { id: makeId('c_', rnd), firstName, lastName, email, createdAt: createdAt.toISOString() }
  })

  const orders: Order[] = []
  const today = startOfDay(new Date())
  const days = 210
  for (let d = days; d >= 0; d--) {
    const date = addDays(today, -d)
    const orderCount = Math.floor(rnd()*6)
    for (let i = 0; i < orderCount; i++) {
      const customer = randomPick(customers, rnd)
      const lineCount = clamp(1 + Math.floor(rnd()*3), 1, 5)
      const items = Array.from({ length: lineCount }).map(() => {
        const prod = randomPick(products, rnd)
        const qty = clamp(1 + Math.floor(rnd()*3), 1, 5)
        return { productId: prod.id, qty, price: prod.price }
      })
      const subtotal = items.reduce((s, it) => s + it.qty * it.price, 0)
      const total = Math.round(subtotal * (1 + 0.07) * 100) / 100
      const statuses: Order['financialStatus'][] = ['paid','pending','paid','paid','paid','refunded']
      const financialStatus = randomPick(statuses, rnd)
      orders.push({ id: makeId('o_', rnd), customerId: customer.id, items, total, currency: 'USD', financialStatus, processedAt: new Date(date.getTime() + Math.floor(rnd()*86400000)).toISOString() })
    }
  }

  const events: Event[] = []
  for (let i = 0; i < 80; i++) {
    const typ: Event['type'] = rnd() > 0.5 ? 'cart_abandoned' : 'checkout_started'
    const c = randomPick(customers, rnd)
    const when = addDays(today, -Math.floor(rnd()*90))
    events.push({ id: makeId('e_', rnd), type: typ, customerId: c.id, createdAt: when.toISOString() })
  }

  return { products, customers, orders, events }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'CREATE_TENANT': {
      const id = action.id
      const t = { id, name: action.name }
      return {
        tenants: { ...state.tenants, [id]: t },
        datasets: { ...state.datasets, [id]: createDemoData(id) },
        currentTenantId: id
      }
    }
    case 'SET_CURRENT_TENANT': return { ...state, currentTenantId: action.id }
    case 'CONNECT_SHOP': {
      const t = state.tenants[action.tenantId]; if (!t) return state
      const nt = { ...t, shop: { domain: action.domain, token: action.token, connected: true } }
      return { ...state, tenants: { ...state.tenants, [action.tenantId]: nt } }
    }
    default: return state
  }
}

function randomId() { return 't_' + Math.random().toString(36).slice(2, 10) }

export function DataProvider({ children }: { children: React.ReactNode }) {
  const initial: State = useMemo(() => {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}') || { tenants: {}, datasets: {} } }
    catch { return { tenants: {}, datasets: {} } }
  }, [])
  const [state, dispatch] = useReducer(reducer, { tenants: {}, datasets: {}, ...initial })

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state))
  }, [state])

  const api = {
    tenantsForCurrentUser: () => Object.values(state.tenants),
    currentTenant: state.currentTenantId ? state.tenants[state.currentTenantId] : undefined,
    createTenant: (name: string) => { const id = randomId(); dispatch({ type: 'CREATE_TENANT', name, id }); return { id, name } },
    setCurrentTenant: (id: string) => dispatch({ type: 'SET_CURRENT_TENANT', id }),
    connectShop: (tenantId: string, domain: string, token: string) => dispatch({ type: 'CONNECT_SHOP', tenantId, domain, token }),
    dataset: (tenantId?: string) => {
      const id = tenantId || state.currentTenantId
      return (id && state.datasets[id]) ? state.datasets[id] : { products: [], customers: [], orders: [], events: [] }
    },
    metrics: (tenantId: string, startISO: string, endISO: string) => {
      const ds = api.dataset(tenantId)
      const start = parseISO(startISO); const end = addDays(parseISO(endISO), 1)
      const ords = ds.orders.filter(o => isWithinInterval(parseISO(o.processedAt), { start, end }))
      const totalRevenue = ords.reduce((s, o) => s + o.total, 0)
      const totalOrders = ords.length
      const customersSet = new Set(ords.map(o => o.customerId))
      const totalCustomers = customersSet.size
      const aov = totalOrders ? totalRevenue / totalOrders : 0
      const counts: Record<string, number> = {}; ords.forEach(o => { counts[o.customerId] = (counts[o.customerId] || 0) + 1 })
      const repeaters = Object.values(counts).filter(n => n > 1).length
      const repeatRate = totalCustomers ? (repeaters / totalCustomers) : 0
      const map: Record<string, { date: string, orders: number, revenue: number }> = {}
      ords.forEach(o => { const d = o.processedAt.slice(0,10); if (!map[d]) map[d] = { date: d, orders: 0, revenue: 0 }; map[d].orders += 1; map[d].revenue += o.total })
      const series = Object.values(map).sort((a,b) => a.date.localeCompare(b.date))
      const spendBy: Record<string, number> = {}; ords.forEach(o => { spendBy[o.customerId] = (spendBy[o.customerId] || 0) + o.total })
      const topCustomers = Object.entries(spendBy).map(([cid, amt]) => {
        const c = ds.customers.find(c => c.id === cid)!
        return { id: cid, name: `${c.firstName} ${c.lastName}`, email: c.email, spent: amt }
      }).sort((a,b) => b.spent - a.spent).slice(0,5)
      const productRev: Record<string, number> = {}; ords.forEach(o => o.items.forEach(li => { productRev[li.productId] = (productRev[li.productId] || 0) + li.qty * li.price }))
      const topProducts = Object.entries(productRev).map(([pid, amt]) => {
        const p = ds.products.find(p => p.id === pid)!
        return { id: pid, title: p.title, category: p.category, revenue: amt }
      }).sort((a,b) => b.revenue - a.revenue).slice(0,5)
      const status: Record<string, number> = {}; ords.forEach(o => { status[o.financialStatus] = (status[o.financialStatus] || 0) + 1 })
      const statusData = Object.entries(status).map(([k,v]) => ({ name: k, value: v }))
      const evts = ds.events.filter(e => isWithinInterval(parseISO(e.createdAt), { start, end }))
      const abandoned = evts.filter(e => e.type === 'cart_abandoned').length
      const proxySessions = totalOrders + abandoned
      const conversionRate = proxySessions ? (totalOrders / proxySessions) : 0
      return { totals: { customers: totalCustomers, orders: totalOrders, revenue: totalRevenue, aov, repeatRate, conversionRate }, series, topCustomers, topProducts, statusData }
    },
    exportCSV: (tenantId: string, startISO: string, endISO: string) => {
      const ds = api.dataset(tenantId)
      const start = parseISO(startISO); const end = addDays(parseISO(endISO), 1)
      const ords = ds.orders.filter(o => isWithinInterval(parseISO(o.processedAt), { start, end }))
      const rows = [['order_id','processed_at','customer_id','total','currency','status'].join(',')]
      ords.forEach(o => rows.push([o.id,o.processedAt,o.customerId,o.total.toFixed(2),o.currency,o.financialStatus].join(',')))
      const blob = new Blob([rows.join('\\n')], { type: 'text/csv' })
      const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `orders_${tenantId}.csv`; a.click(); URL.revokeObjectURL(url)
    }
  }

  return <DataCtx.Provider value={api}>{children}</DataCtx.Provider>
}

export function useData() {
  const ctx = useContext(DataCtx); if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
