import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ContactInfo } from '@/components/contact-info';
import { MapPin, Clock, Mail } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary via-purple-500 to-accent text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Entre em Contato</h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Estamos aqui para ajudar e responder todas as suas dúvidas sobre nossas coleções.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <ContactInfo />
        </section>

        {/* Info Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Hours */}
            <div className="p-8 bg-card border-2 border-border rounded-lg hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-primary" />
                <h3 className="font-bold text-lg">Horário de Atendimento</h3>
              </div>
              <div className="space-y-2 text-muted-foreground">
                <p><span className="font-semibold text-foreground">Segunda a Sexta:</span> 09:00 - 18:00</p>
                <p><span className="font-semibold text-foreground">Sábado:</span> 09:00 - 14:00</p>
                <p><span className="font-semibold text-foreground">Domingo:</span> Fechado</p>
              </div>
            </div>

            {/* Location Details */}
            <div className="p-8 bg-card border-2 border-border rounded-lg hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-primary" />
                <h3 className="font-bold text-lg">Nossa Localização</h3>
              </div>
              <div className="space-y-2 text-muted-foreground">
                <p><span className="font-semibold text-foreground">Bairro:</span> Khongolote</p>
                <p><span className="font-semibold text-foreground">Cidade:</span> Maputo</p>
                <p><span className="font-semibold text-foreground">País:</span> Moçambique</p>
              </div>
            </div>

            {/* Email */}
            <div className="p-8 bg-card border-2 border-border rounded-lg hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-primary" />
                <h3 className="font-bold text-lg">Email</h3>
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  <a href="mailto:shells@fashion.com" className="text-primary hover:underline font-semibold">
                    shells@fashion.com
                  </a>
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  Responderemos em até 24 horas durante o horário comercial.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-20">
          <div className="glass bg-gradient-to-r from-primary via-purple-500 to-accent p-12 md:p-16 rounded-2xl text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 space-y-6">
              <h2 className="font-serif text-4xl font-bold">Pronto para Começar?</h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Clique em um dos contatos acima e comece a conversar conosco via WhatsApp, chamada ou visite-nos em Maputo!
              </p>
              <a
                href="https://wa.me/258879992762"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-white text-primary font-bold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
              >
                Abrir WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
