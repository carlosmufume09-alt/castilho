'use client';

import { useEffect, useState } from 'react';
import { Product, Order } from '@prisma/client';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/orders'),
        ]);

        const productsData = await productsRes.json();
        const ordersData = await ordersRes.json();

        const products = productsData.data || [];
        const orders = ordersData.data || [];

        const totalRevenue = orders.reduce(
          (sum: number, order: Order) => sum + Number(order.total),
          0
        );

        setStats({
          totalProducts: products.length,
          totalOrders: orders.length,
          pendingOrders: orders.filter((o: Order) => o.status === 'pendente').length,
          totalRevenue,
        });
      } catch (error) {
        console.error('[v0] Fetch stats error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="font-serif text-4xl font-bold mb-8">Dashboard</h1>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">Total de Produtos</p>
            <p className="text-3xl font-bold">{stats.totalProducts}</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">Total de Pedidos</p>
            <p className="text-3xl font-bold">{stats.totalOrders}</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">Pedidos Pendentes</p>
            <p className="text-3xl font-bold text-orange-600">{stats.pendingOrders}</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">Receita Total</p>
            <p className="text-3xl font-bold">MT {stats.totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
