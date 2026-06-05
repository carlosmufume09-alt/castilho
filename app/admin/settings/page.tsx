'use client';

import { useEffect, useState } from 'react';

export default function AdminSettings() {
  const [storeData, setStoreData] = useState({
    name: '',
    description: '',
    whatsapp: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await fetch('/api/store');
        const data = await res.json();
        if (data.data) {
          setStoreData({
            name: data.data.name || '',
            description: data.data.description || '',
            whatsapp: data.data.whatsapp || '',
          });
        }
      } catch (error) {
        console.error('[v0] Fetch store error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/store', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(storeData),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      }
    } catch (error) {
      console.error('[v0] Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="font-serif text-4xl font-bold mb-8">Configurações</h1>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome da Loja</label>
              <input
                type="text"
                value={storeData.name}
                onChange={(e) =>
                  setStoreData({ ...storeData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-border rounded bg-input text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Descrição</label>
              <textarea
                value={storeData.description}
                onChange={(e) =>
                  setStoreData({ ...storeData, description: e.target.value })
                }
                className="w-full px-4 py-2 border border-border rounded bg-input text-foreground"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Número WhatsApp
              </label>
              <input
                type="tel"
                value={storeData.whatsapp}
                onChange={(e) =>
                  setStoreData({ ...storeData, whatsapp: e.target.value })
                }
                placeholder="5511999999999"
                className="w-full px-4 py-2 border border-border rounded bg-input text-foreground"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Formato: 55 + DDD + número (sem caracteres especiais)
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-primary text-primary-foreground px-6 py-2 rounded hover:opacity-90 transition disabled:opacity-50"
            >
              {saving ? 'Salvando...' : 'Salvar Configurações'}
            </button>
            {success && (
              <span className="text-green-600 font-medium">Salvo com sucesso!</span>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
