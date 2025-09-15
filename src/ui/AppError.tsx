import { isRouteErrorResponse, useRouteError, Link } from 'react-router-dom'
export default function AppError() {
  const error = useRouteError() as any
  const message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : (error?.message || 'Something went wrong')
  return (
    <div className="container max-w-xl mt-16 text-center">
      <div className="text-7xl font-black text-slate-200 mb-4">Oops!</div>
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-2">Unexpected Application Error</h2>
        <p className="text-slate-600 mb-4">{message}</p>
        {process.env.NODE_ENV !== 'production' && error?.stack && (
          <pre className="text-left text-xs bg-slate-50 p-3 rounded overflow-auto max-h-64">{String(error.stack)}</pre>
        )}
        <div className="mt-4"><Link to="/" className="btn btn-primary">Go Home</Link></div>
      </div>
    </div>
  )
}
