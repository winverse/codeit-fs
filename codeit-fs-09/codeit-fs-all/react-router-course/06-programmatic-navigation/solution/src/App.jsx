import { Routes, Route } from 'react-router';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { DashboardPage } from './pages/Dashboard';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}