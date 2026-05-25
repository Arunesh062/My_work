import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainLayout from './layout/MainLayout';

export default function PrivateRoute() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-accent-cyan/5 border-t-accent-cyan rounded-full animate-spin shadow-2xl shadow-accent-cyan/10" />
        <p className="mt-8 text-slate-500 font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">Synchronizing Node Registry...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
