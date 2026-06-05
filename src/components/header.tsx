'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ShoppingCart, LogOut, LayoutDashboard } from 'lucide-react';

export function Header() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [storeName, setStoreName] = useState('Shells Fashion Elegance');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setIsAdmin(!!token);

    fetch('/api/store')
      .then(res => res.json())
      .then(data => {
        if (data.data?.name) {
          setStoreName(data.data.name);
        }
      })
      .catch(err => console.log('[v0] Store fetch error:', err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
    router.push('/');
  };

  return (
    <header className="bg-gradient-to-r from-primary via-purple-500 to-accent border-b border-primary/20 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition">
            <span className="text-lg font-bold">S</span>
          </div>
          <div className="hidden sm:block">
            <div className="font-serif text-xl font-bold tracking-tight">{storeName}</div>
            <div className="text-xs opacity-80">Fashion & Elegance</div>
          </div>
        </Link>

        <div className="flex items-center gap-6 md:gap-8">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition font-medium text-sm"
          >
            <span className="hidden sm:inline">Contato</span>
          </Link>

          <Link
            href="/cart"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition font-medium text-sm"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline">Carrinho</span>
          </Link>

          {isAdmin && (
            <>
              <Link
                href="/admin/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition font-medium text-sm"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span className="hidden sm:inline">Admin</span>
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition font-medium text-sm"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </>
          )}

          {!isAdmin && (
            <Link href="/login" className="px-4 py-2 bg-white/20 rounded-lg font-medium text-sm hover:bg-white/30 transition">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
