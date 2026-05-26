import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import PrivateRoute from './components/PrivateRoute';
import { Suspense, lazy } from 'react';

// Lazy load pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Reminders = lazy(() => import('./pages/Reminders'));
const WeightTracker = lazy(() => import('./pages/WeightTracker'));
const CaloriesTracker = lazy(() => import('./pages/CaloriesTracker'));
const WaterTracker = lazy(() => import('./pages/WaterTracker'));
const Streaks = lazy(() => import('./pages/Streaks'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Settings = lazy(() => import('./pages/Settings'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));

const LoadingScreen = () => (
  <div className="min-h-screen bg-dark-900 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-accent-cyan/20 border-t-accent-cyan rounded-full animate-spin" />
      <p className="text-slate-500 font-medium animate-pulse tracking-widest text-xs uppercase">Initializing System...</p>
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/reminders" element={<Reminders />} />
              <Route path="/weight" element={<WeightTracker />} />
              <Route path="/calories" element={<CaloriesTracker />} />
              <Route path="/water" element={<WaterTracker />} />
              <Route path="/streaks" element={<Streaks />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}
