import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(() => localStorage.getItem('theme') === 'dark')
  useEffect(() => {
    const root = document.documentElement
    if (dark) { root.classList.add('dark'); localStorage.setItem('theme','dark') }
    else { root.classList.remove('dark'); localStorage.setItem('theme','light') }
  }, [dark])
  return <button className="btn btn-outline" onClick={() => setDark(d => !d)}>{dark ? '🌙 Dark' : '☀️ Light'}</button>
}
