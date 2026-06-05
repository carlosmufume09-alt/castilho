'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Product } from '@prisma/client';

interface SearchBarProps {
  products: Product[];
}

export function SearchBar({ products }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);
    
    if (value.length > 0) {
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(value.toLowerCase()) ||
        p.description.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length > 0 && setIsOpen(true)}
          className="w-full pl-12 pr-4 py-3 bg-white border-2 border-primary/30 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-foreground placeholder-muted-foreground"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              setIsOpen(false);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-primary/30 rounded-lg shadow-2xl z-50 max-h-96 overflow-y-auto">
          {results.map(product => (
            <a
              key={product.id}
              href={`/products/${product.id}`}
              className="flex items-center gap-3 p-3 hover:bg-primary/10 transition border-b border-border last:border-0"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">{product.name}</p>
                <p className="text-sm text-muted-foreground truncate">{product.description}</p>
                <p className="text-sm font-bold text-primary">MT {Number(product.price).toFixed(2)}</p>
              </div>
            </a>
          ))}
        </div>
      )}

      {isOpen && query.length > 0 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-primary/30 rounded-lg shadow-2xl z-50 p-4 text-center text-muted-foreground">
          Nenhum produto encontrado para "{query}"
        </div>
      )}
    </div>
  );
}
