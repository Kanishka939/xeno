export default function Clear() {
  localStorage.removeItem('xeno_ui_auth_v4')
  localStorage.removeItem('xeno_ui_data_v4')
  return (
    <div className="container max-w-xl mt-16">
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-2">Storage cleared</h2>
        <p className="text-slate-600">Reload the app and sign up again.</p>
      </div>
    </div>
  )
}
