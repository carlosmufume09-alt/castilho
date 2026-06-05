'use client';

import { Product } from '@prisma/client';
import Link from 'next/link';
import { Zap, Heart, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [addedToCart, setAddedToCart] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const exists = cart.find((p: any) => p.id === product.id);

    if (exists) {
      exists.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
      {product.image && (
        <div className="w-full h-72 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden relative">
          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between z-10 pointer-events-none">
            <div className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
              ⭐ Premium
            </div>
            {product.active && (
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Em Estoque
              </div>
            )}
          </div>

          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* Like Button */}
          <button
            onClick={() => setLiked(!liked)}
            className="absolute top-3 right-3 z-20 p-2 bg-white/80 rounded-full hover:bg-white transition-all duration-300 hover:scale-110"
          >
            <Heart className={`w-5 h-5 transition-all ${liked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>
        </div>
      )}
      {!product.image && (
        <div className="w-full h-72 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <span className="text-muted-foreground">Sem imagem</span>
        </div>
      )}

      <div className="p-6">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-serif text-lg font-bold mb-2 group-hover:text-primary transition cursor-pointer line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-10">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-accent">★</span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">(48 reviews)</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <div className="text-2xl font-bold text-primary">
              MT {Number(product.price).toFixed(2)}
            </div>
            <div className="text-xs text-green-600 font-semibold">
              Economize MT {(Number(product.price) * 0.15).toFixed(2)}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className={`p-3 rounded-full transition-all duration-300 flex-shrink-0 ${
              addedToCart
                ? 'bg-green-500 text-white scale-110 shadow-lg'
                : 'bg-primary text-primary-foreground hover:bg-accent hover:scale-110 shadow-lg hover:shadow-xl'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>

        {!product.active && (
          <div className="mt-4 px-3 py-2 bg-red-500/10 border border-red-300/50 rounded-lg text-red-600 text-sm font-medium text-center">
            Indisponível
          </div>
        )}
      </div>
    </div>
  );
}
