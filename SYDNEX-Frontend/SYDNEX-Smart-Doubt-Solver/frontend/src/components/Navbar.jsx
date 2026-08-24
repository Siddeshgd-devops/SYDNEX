import { useState } from 'react';
import { LogOut, X, Menu, Sun, Moon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion as _Motion } from 'framer-motion';
import { useAuth } from '../context/useAuth';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => (localStorage.getItem('theme') || 'light'));
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  // Ensure HTML class reflects stored theme on mount
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }

  return (
    <nav className="fixed top-0 w-full z-50 glass-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="gradient-text text-xl font-bold">SYDNEX</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/ask" className="text-gray-700 hover:text-blue-600 transition-colors">Ask Doubt</Link>
            {user && (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">Dashboard</Link>
                <Link to="/history" className="text-gray-700 hover:text-blue-600 transition-colors">History</Link>
                <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition-colors">Profile</Link>
              </>
            )}
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors" title="Toggle theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Hi, {user.displayName || user.email}</span>
                <button onClick={handleLogout} className="flex items-center space-x-1 text-gray-700 hover:text-red-600">
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="glass-button">Login</Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden glass-card mt-2 mx-4 rounded-lg">
          <div className="px-4 py-2 space-y-2">
            <Link to="/" className="block py-2 text-gray-700">Home</Link>
            <Link to="/ask" className="block py-2 text-gray-700">Ask Doubt</Link>
            {user && (
              <>
                <Link to="/dashboard" className="block py-2 text-gray-700">Dashboard</Link>
                <Link to="/history" className="block py-2 text-gray-700">History</Link>
                <Link to="/profile" className="block py-2 text-gray-700">Profile</Link>
              </>
            )}
            <Link to="/about" className="block py-2 text-gray-700">About</Link>
            <button onClick={toggleTheme} className="w-full text-left py-2 text-gray-700">Toggle Theme</button>
            {user ? (
              <button onClick={handleLogout} className="block py-2 text-red-600">Logout</button>
            ) : (
              <Link to="/login" className="block py-2 text-blue-600">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};