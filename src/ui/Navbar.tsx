import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../state/auth';
import TenantSwitch from './TenantSwitch';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const isAuthPage = ['/login', '/signup', '/clear'].some(p => loc.pathname.startsWith(p));

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 shadow-lg">
      <div className="container flex items-center justify-between py-4 sm:py-5">
        <div className="flex items-center gap-6">
          <Link to="/" className="inline-flex items-center gap-3 animate-fade-in">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 grid place-items-center font-bold text-white shadow-lg transform hover:scale-110 transition-transform duration-300">
              <span className="text-xl">🚀</span>
            </div>
            <div className="font-extrabold text-lg tracking-wide text-gray-800 dark:text-gray-200">
              Xeno Insights
            </div>
          </Link>
          {currentUser && !isAuthPage && <TenantSwitch />}
        </div>
        
        <div className="flex items-center gap-4">
          {!currentUser ? (
            <div className="flex items-center gap-2">
              <Link to="/login" className="btn btn-outline hover-lift">
                Login
              </Link>
              <Link to="/signup" className="btn btn-gradient hover-lift">
                Sign up
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4 animate-fade-in">
              <ThemeToggle />
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Signed in as
                </span>
                <b className="font-semibold text-gray-800 dark:text-gray-200">{currentUser.email}</b>
              </div>
              <button 
                className="btn btn-outline hover-lift" 
                onClick={() => { logout(); nav('/login', { replace: true }); }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}