'use client';

import { Star } from 'lucide-react';

export function TestimonialSection() {
  const testimonials = [
    {
      name: 'Amélia Mandela',
      city: 'Maputo, Moçambique',
      image: '👩',
      text: 'A qualidade dos produtos é excepcional! Recebi meu pedido em 2 dias e a peça ficou melhor do que esperava. Recomendo!',
      rating: 5,
    },
    {
      name: 'Cristina João',
      city: 'Beira, Moçambique',
      image: '👸',
      text: 'Shells Fashion é sinônimo de elegância e bom gosto. Adoro usar suas peças em eventos especiais!',
      rating: 5,
    },
    {
      name: 'Fátima Neves',
      city: 'Maputo, Khongolote',
      image: '💃',
      text: 'O atendimento via WhatsApp foi super rápido e eficiente. A dona é muito atenciosa. Voltarei sempre!',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-4">
            <span className="text-primary font-semibold text-sm">Depoimentos</span>
          </div>
          <h2 className="font-serif text-4xl font-bold mb-4">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-muted-foreground text-lg">
            Milhares de clientes satisfeitos em Moçambique compram com a gente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white p-8 rounded-xl border-2 border-primary/10 hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex gap-4 mb-4">
                <div className="text-5xl">{item.image}</div>
                <div className="flex-1">
                  <h4 className="font-bold">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.city}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-muted-foreground italic leading-relaxed">
                &quot;{item.text}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
