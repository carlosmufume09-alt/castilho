'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('adminToken');

      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const res = await fetch('/api/auth/verify', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem('adminToken');
          router.push('/login');
        }
      } catch (error) {
        console.error('[v0] Auth verify error:', error);
        localStorage.removeItem('adminToken');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 bg-primary text-primary-foreground p-6 border-r border-border">
        <h2 className="font-serif text-2xl font-bold mb-8">Admin</h2>

        <nav className="space-y-2">
          <Link
            href="/admin/dashboard"
            className="block px-4 py-2 rounded hover:bg-primary-foreground/10 transition"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/products"
            className="block px-4 py-2 rounded hover:bg-primary-foreground/10 transition"
          >
            Produtos
          </Link>
          <Link
            href="/admin/orders"
            className="block px-4 py-2 rounded hover:bg-primary-foreground/10 transition"
          >
            Pedidos
          </Link>
          <Link
            href="/admin/settings"
            className="block px-4 py-2 rounded hover:bg-primary-foreground/10 transition"
          >
            Configurações
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="w-full mt-8 flex items-center justify-center gap-2 px-4 py-2 rounded hover:bg-primary-foreground/10 transition"
        >
          <LogOut className="w-5 h-5" />
          Sair
        </button>
      </aside>

      <main className="flex-1">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
