'use client';

import { Header } from '@/components/header';
import { ProductCard } from '@/components/product-card';
import { Footer } from '@/components/footer';
import { FeatureSection } from '@/components/feature-section';
import { TestimonialSection } from '@/components/testimonial-section';
import { SearchBar } from '@/components/search-bar';
import { Product } from '@prisma/client';
import { useEffect, useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full animate-slide-in-left">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold text-sm">Bem-vindo a Shells Fashion Elegance</span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent text-balance animate-slide-in-right">
              Elegância <br /> Moçambicana
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Descubra nossa coleção exclusiva de moda moçambicana. Cada peça é selecionada com cuidado para oferecer elegância e sofisticação com o melhor do estilo africano.
            </p>

            {/* Search Bar */}
            {products.length > 0 && (
              <div className="w-full mt-8 mb-4">
                <SearchBar products={products} />
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button className="px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 transition-all flex items-center justify-center gap-2 group">
                Explorar Coleção
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all">
                Sobre Nós
              </button>
            </div>

            {/* Animated elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
        </section>

        {/* Products Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/30 border-t-primary"></div>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-12">
                <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-4">
                  <span className="text-primary font-semibold text-sm">✨ DESTAQUES</span>
                </div>
                <h2 className="font-serif text-4xl font-bold mb-4">Coleção Premium</h2>
                <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, idx) => (
                  <div key={product.id} className="animate-slide-in-right" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">Nenhum produto disponível no momento</p>
            </div>
          )}
        </section>

        {/* Features Section */}
        <FeatureSection />

        {/* Testimonials Section */}
        <TestimonialSection />

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="glass bg-gradient-to-r from-primary via-purple-500 to-accent p-12 md:p-16 rounded-2xl text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 space-y-6">
              <h2 className="font-serif text-4xl font-bold">Pronto para Brilhar?</h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Junte-se a milhares de clientes que já descobriram o poder da elegância. Sua próxima peça de destaque está aqui.
              </p>
              <button className="px-8 py-3 bg-white text-primary font-bold rounded-lg hover:shadow-lg hover:scale-105 transition-all">
                Ver Todos os Produtos
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
