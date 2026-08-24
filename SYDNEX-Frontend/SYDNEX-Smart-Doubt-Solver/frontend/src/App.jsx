import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { AskDoubt } from './pages/AskDoubt';
import { Answer } from './pages/Answer';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { History } from './pages/History';
import { About } from './pages/About';
import { RoleSelection } from './pages/RoleSelection';
import { StudentDashboard } from './pages/StudentDashboard';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { Profile } from './pages/Profile';
import { PageTransition } from './components/PageTransition';
import { SplashScreen } from './components/SplashScreen';
import { useEffect, useState } from 'react';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/ask" element={<PageTransition><AskDoubt /></PageTransition>} />
        <Route path="/answer" element={<PageTransition><Answer /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/role-selection" element={<PageTransition><RoleSelection /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/student/dashboard" element={<PageTransition><StudentDashboard /></PageTransition>} />
        <Route path="/teacher/dashboard" element={<PageTransition><TeacherDashboard /></PageTransition>} />
        <Route path="/history" element={<PageTransition><History /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    const seen = sessionStorage.getItem('splashSeen');
    return !seen;
  });

  useEffect(() => {
    if (!showSplash) return;
    sessionStorage.setItem('splashSeen', '1');
  }, [showSplash]);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <SplashScreen visible={showSplash} onFinish={() => setShowSplash(false)} />
          <Navbar />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;