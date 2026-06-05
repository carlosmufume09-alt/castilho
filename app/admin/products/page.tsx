'use client';

import { useEffect, useState } from 'react';
import { Product } from '@prisma/client';
import { Trash2, Edit2, Plus } from 'lucide-react';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch('/api/products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error('[v0] Fetch products error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error('[v0] Delete error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('adminToken');
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId
        ? `/api/products/${editingId}`
        : '/api/products';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        if (editingId) {
          setProducts(products.map(p => (p.id === editingId ? data.data : p)));
          setEditingId(null);
        } else {
          setProducts([...products, data.data]);
        }

        setFormData({
          name: '',
          description: '',
          price: '',
          category: '',
          stock: '',
        });
        setShowForm(false);
      }
    } catch (error) {
      console.error('[v0] Submit error:', error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-4xl font-bold">Produtos</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
          }}
          className="bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90 transition inline-flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Novo Produto
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-lg p-6 mb-8 space-y-4"
        >
          <input
            type="text"
            placeholder="Nome"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-border rounded bg-input text-foreground"
            required
          />
          <textarea
            placeholder="Descrição"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-3 py-2 border border-border rounded bg-input text-foreground"
            rows={3}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              step="0.01"
              placeholder="Preço"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="px-3 py-2 border border-border rounded bg-input text-foreground"
              required
            />
            <input
              type="text"
              placeholder="Categoria"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="px-3 py-2 border border-border rounded bg-input text-foreground"
            />
          </div>
          <input
            type="number"
            placeholder="Estoque"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="w-full px-3 py-2 border border-border rounded bg-input text-foreground"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90 transition"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
              className="bg-muted text-muted-foreground px-4 py-2 rounded hover:opacity-90 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-2">
          {products.map(product => (
            <div
              key={product.id}
              className="bg-card border border-border rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">
                  MT {Number(product.price).toFixed(2)} • Estoque: {product.stock}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingId(product.id);
                    setFormData({
                      name: product.name,
                      description: product.description,
                      price: product.price.toString(),
                      category: product.category,
                      stock: product.stock.toString(),
                    });
                    setShowForm(true);
                  }}
                  className="p-2 text-primary hover:bg-primary/10 rounded transition"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
