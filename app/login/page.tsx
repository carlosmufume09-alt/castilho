'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Erro ao fazer login');
      }
    } catch (err) {
      console.error('[v0] Login error:', err);
      setError('Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-purple-500 to-accent flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-4">
            <span className="text-white text-sm font-semibold">Acesso Restrito</span>
          </div>
          <h1 className="font-serif text-4xl font-bold mb-2 text-white">
            Shells Fashion Elegance
          </h1>
          <p className="text-white/80 text-lg">Painel Administrativo</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl backdrop-blur">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-primary/20 rounded-lg bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-primary/20 rounded-lg bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/30 transition disabled:opacity-50 disabled:shadow-none"
            >
              {loading ? 'Conectando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t-2 border-primary/10">
            <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase">Credenciais de Teste:</p>
            <div className="space-y-2 text-sm text-muted-foreground bg-primary/5 p-4 rounded-lg">
              <p><span className="font-semibold">Email:</span> admin@example.com</p>
              <p><span className="font-semibold">Senha:</span> 123456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
