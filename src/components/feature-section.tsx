'use client';

import { Sparkles, Users, Award, TrendingUp } from 'lucide-react';

export function FeatureSection() {
  const features = [
    {
      icon: Sparkles,
      title: 'Coleção Exclusiva',
      description: 'Peças selecionadas manualmente pelos melhores designers internacionais',
    },
    {
      icon: Users,
      title: 'Comunidade Luxo',
      description: 'Junte-se a mais de 10 mil clientes satisfeitos em Moçambique e África',
    },
    {
      icon: Award,
      title: 'Qualidade Premium',
      description: 'Todos os produtos são certificados e garantidos por 1 ano',
    },
    {
      icon: TrendingUp,
      title: 'Tendências 2024',
      description: 'Sempre com as últimas tendências de moda internacional',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-4">
            <span className="text-primary font-semibold text-sm">Por Que Shells?</span>
          </div>
          <h2 className="font-serif text-4xl font-bold mb-4">
            O Que Nos Torna Especiais
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Conheça os diferenciais que fazem Shells Fashion Elegance a melhor escolha
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group p-8 bg-white border-2 border-primary/20 rounded-xl hover:border-primary hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
