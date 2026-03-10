import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollRestoration />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
