'use client';

import { Header } from '@/components/header';
import { useEffect, useState } from 'react';
import { Trash2, MessageSquare } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [storeData, setStoreData] = useState({ name: '', whatsapp: '' });
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      setCart(JSON.parse(cartData));
    }

    fetch('/api/store')
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setStoreData(data.data);
        }
      })
      .catch(err => console.log('[v0] Store fetch error:', err));
  }, []);

  const removeFromCart = (id: string) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    const updated = cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !customerPhone || cart.length === 0) {
      alert('Preencha todos os campos e adicione produtos ao carrinho');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: customerName,
          phone: customerPhone,
          items: cart,
          total: total.toFixed(2),
        }),
      });

      const data = await response.json();

      if (data.success) {
        const message = encodeURIComponent(
          `Olá! Gostaria de fazer um pedido:\n\n${cart
            .map(item => `- ${item.name} (x${item.quantity}): MT ${(item.price * item.quantity).toFixed(2)}`)
            .join('\n')}\n\nTotal: MT ${total.toFixed(2)}\n\nNome: ${customerName}\nTelefone: ${customerPhone}`
        );

        const whatsappUrl = `https://wa.me/${storeData.whatsapp.replace(/\D/g, '')}?text=${message}`;
        window.open(whatsappUrl, '_blank');

        localStorage.removeItem('cart');
        setCart([]);
        setCustomerName('');
        setCustomerPhone('');
      } else {
        alert('Erro ao criar pedido');
      }
    } catch (error) {
      console.error('[v0] Checkout error:', error);
      alert('Erro ao processar pedido');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-4xl font-bold mb-8">Seu Carrinho</h1>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Seu carrinho está vazio</p>
            <a href="/" className="text-primary hover:underline">
              Voltar para loja
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="bg-card border border-border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      MT {Number(item.price).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value) || 1)
                      }
                      className="w-16 px-2 py-1 border border-border rounded bg-input text-foreground text-center"
                    />
                    <span className="w-24 text-right font-semibold">
                      MT {(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="bg-card border border-border rounded-lg p-6 sticky top-4">
                <div className="mb-6 space-y-2 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>MT {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>MT {total.toFixed(2)}</span>
                  </div>
                </div>

                <form onSubmit={handleCheckout} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded bg-input text-foreground placeholder-muted-foreground"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Seu WhatsApp"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded bg-input text-foreground placeholder-muted-foreground"
                    required
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-primary text-primary-foreground py-2 rounded font-semibold hover:opacity-90 transition disabled:opacity-50 inline-flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-5 h-5" />
                    {submitting ? 'Processando...' : 'Finalizar no WhatsApp'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
