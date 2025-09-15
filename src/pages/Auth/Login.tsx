import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../state/auth';
import Card from '../../ui/Card';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('demo@xeno.app');
  const [password, setPassword] = useState('demo123');
  const [err, setErr] = useState<string | null>(null);
  const nav = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    try {
      await login(email, password);
      nav('/', { replace: true });
    } catch (e: any) {
      setErr(e.message || 'Login failed');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 bg-slate-100 dark:bg-gray-900 transition-colors duration-500">
      {/* Container for the Card to control max-width and centering */}
      <div className="w-full max-w-lg lg:max-w-md animate-fade-in-up">
        {/* The Card Component itself */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-10 space-y-8 transition-colors duration-500">
          
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
              Welcome back
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sign in to your account
            </p>
          </div>
          
          <form onSubmit={submit} className="space-y-6">
            <div>
              <label className="label">Email</label>
              <input 
                className="input" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="you@example.com" 
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input 
                type="password" 
                className="input" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="••••••••" 
              />
            </div>
            {err && (
              <div className="text-rose-500 text-sm font-medium">
                {err}
              </div>
            )}
            <button className="btn btn-primary w-full">
              Sign in
            </button>
          </form>
          
          <div className="text-sm text-center text-gray-500 dark:text-gray-400">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}