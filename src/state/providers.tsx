import { ReactNode } from 'react'
import { AuthProvider } from './auth'
import { DataProvider } from './data'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <DataProvider>
        {children}
      </DataProvider>
    </AuthProvider>
  )
}
