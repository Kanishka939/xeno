import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className="container max-w-lg mt-16 text-center">
      <div className="text-9xl font-black text-slate-200">404</div>
      <p className="mt-2 text-slate-600">Page not found.</p>
      <Link to="/" className="btn btn-primary mt-4">Go home</Link>
    </div>
  )
}
