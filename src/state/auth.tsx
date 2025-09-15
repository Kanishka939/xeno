import React, { createContext, useContext, useMemo, useReducer, useEffect } from 'react'

type UserRecord = { email: string, name?: string, passwordHash: string, tenants: string[] }
type State = { users: Record<string, UserRecord>, currentUserEmail?: string }
type Action =
  | { type: 'SIGNUP', email: string, passwordHash: string, name?: string }
  | { type: 'LOGIN', email: string }
  | { type: 'LOGOUT' }
  | { type: 'ATTACH_TENANT', tenantId: string }

const KEY = 'xeno_ui_auth_v4'
const AuthCtx = createContext<any>(null)

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SIGNUP': {
      if (state.users[action.email]) throw new Error('Email already registered')
      return {
        users: { ...state.users, [action.email]: { email: action.email, name: action.name, passwordHash: action.passwordHash, tenants: [] } },
        currentUserEmail: action.email
      }
    }
    case 'LOGIN': return { ...state, currentUserEmail: action.email }
    case 'LOGOUT': return { ...state, currentUserEmail: undefined }
    case 'ATTACH_TENANT': {
      const email = state.currentUserEmail
      if (!email) return state
      const u = state.users[email]; if (!u) return state
      if (u.tenants.includes(action.tenantId)) return state
      const nu = { ...u, tenants: [...u.tenants, action.tenantId] }
      return { ...state, users: { ...state.users, [email]: nu } }
    }
    default: return state
  }
}

async function hashPassword(pw: string): Promise<string> {
  const enc = new TextEncoder().encode(pw)
  const digest = await crypto.subtle.digest('SHA-256', enc)
  const bytes = Array.from(new Uint8Array(digest))
  return bytes.map(b => b.toString(16).padStart(2, '0')).join('')
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initial: State = useMemo(() => {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}') || { users: {} } }
    catch { return { users: {} } }
  }, [])
  const [state, dispatch] = useReducer(reducer, { users: {}, ...initial })

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state))
  }, [state])

  const api = {
    currentUser: state.currentUserEmail ? state.users[state.currentUserEmail] : undefined,
    async signup(email: string, password: string, name?: string) {
      const passwordHash = await hashPassword(password)
      dispatch({ type: 'SIGNUP', email, passwordHash, name })
    },
    async login(email: string, password: string) {
      const u = state.users[email]; if (!u) throw new Error('Invalid credentials')
      const passwordHash = await hashPassword(password)
      if (u.passwordHash !== passwordHash) throw new Error('Invalid credentials')
      dispatch({ type: 'LOGIN', email })
    },
    logout() { dispatch({ type: 'LOGOUT' }) },
    attachTenantToCurrentUser(tenantId: string) { dispatch({ type: 'ATTACH_TENANT', tenantId }) },
  }

  return <AuthCtx.Provider value={api}>{children}</AuthCtx.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthCtx); if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
