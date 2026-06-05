'use client';

import { useEffect, useState } from 'react';
import { Order } from '@prisma/client';

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        if (data.success) {
          setOrders(data.data);
        }
      } catch (error) {
        console.error('[v0] Fetch orders error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1 className="font-serif text-4xl font-bold mb-8">Pedidos</h1>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <p className="text-muted-foreground">Nenhum pedido recebido</p>
          ) : (
            orders.map(order => (
              <div
                key={order.id}
                className="bg-card border border-border rounded-lg p-6"
              >
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Cliente</p>
                    <p className="font-semibold">{order.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telefone</p>
                    <p className="font-semibold">{order.phone}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Itens</p>
                  <div className="text-sm bg-muted p-3 rounded max-h-32 overflow-y-auto">
                    {Array.isArray(JSON.parse(order.items)) &&
                      JSON.parse(order.items).map(
                        (item: any, idx: number) => (
                          <p key={idx}>
                            {item.name} x{item.quantity}: MT{' '}
                            {(item.price * item.quantity).toFixed(2)}
                          </p>
                        )
                      )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="font-bold text-lg">
                      MT {Number(order.total).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-semibold capitalize">{order.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Data</p>
                    <p className="font-semibold">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
