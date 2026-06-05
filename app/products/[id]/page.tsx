'use client';

import { Header } from '@/components/header';
import { Product } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${params.id}`);
        const data = await res.json();
        if (data.success) {
          setProduct(data.data);
        }
      } catch (error) {
        console.error('[v0] Fetch product error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const exists = cart.find((p: any) => p.id === product.id);

    if (exists) {
      exists.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="text-center py-12">
          <p className="text-muted-foreground">Produto não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {product.image && (
            <div className="bg-secondary rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
          )}
          {!product.image && (
            <div className="bg-secondary rounded-lg flex items-center justify-center h-96">
              <span className="text-muted-foreground">Sem imagem</span>
            </div>
          )}

          <div className="flex flex-col gap-6">
            <div>
              <h1 className="font-serif text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">
                Categoria: {product.category}
              </p>
            </div>

            <p className="text-lg leading-relaxed">{product.description}</p>

            <div className="border-t border-b border-border py-4">
              <p className="text-4xl font-bold">
                MT {Number(product.price).toFixed(2)}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 px-3 py-2 border border-border rounded-lg bg-input text-foreground"
              />
              <button
                onClick={handleAddToCart}
                disabled={!product.active || product.stock === 0}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                  addedToCart
                    ? 'bg-green-500 text-white'
                    : product.active && product.stock > 0
                    ? 'bg-primary text-primary-foreground hover:opacity-90'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {product.active && product.stock > 0 ? 'Adicionar ao Carrinho' : 'Indisponível'}
              </button>
            </div>

            <div className="text-sm text-muted-foreground">
              {product.stock > 0
                ? `${product.stock} em estoque`
                : 'Produto esgotado'}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
