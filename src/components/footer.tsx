'use client';

import Link from 'next/link';
import { Heart, Truck, Shield, Gift, Mail, MapPin, Phone, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary via-purple-600 to-accent text-white">
      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 border-b border-white/10">
        <div className="text-center group">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-white/30 transition">
            <Truck className="w-6 h-6" />
          </div>
          <p className="font-semibold">Entrega Grátis</p>
          <p className="text-sm text-white/80">Acima de MT 5.000</p>
        </div>
        <div className="text-center group">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-white/30 transition">
            <Shield className="w-6 h-6" />
          </div>
          <p className="font-semibold">100% Seguro</p>
          <p className="text-sm text-white/80">Compra protegida</p>
        </div>
        <div className="text-center group">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-white/30 transition">
            <Gift className="w-6 h-6" />
          </div>
          <p className="font-semibold">Ofertas</p>
          <p className="text-sm text-white/80">Descontos exclusivos</p>
        </div>
        <div className="text-center group">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-white/30 transition">
            <Heart className="w-6 h-6" />
          </div>
          <p className="font-semibold">Satisfação</p>
          <p className="text-sm text-white/80">Ou seu dinheiro de volta</p>
        </div>
      </div>

      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white/10 rounded-2xl mb-12">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">Receba Ofertas Exclusivas</h3>
          <p className="text-white/80">Cadastre-se para receber as melhores novidades e promoções</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="seu@email.com"
            className="flex-1 px-4 py-3 rounded-lg bg-white text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button className="px-6 py-3 bg-white text-primary font-bold rounded-lg hover:shadow-lg transition">
            Inscrever
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="text-2xl font-bold">S</div>
            <div>
              <p className="font-bold">Shells Fashion</p>
              <p className="text-sm text-white/80">Moçambique</p>
            </div>
          </div>
          <p className="text-white/80 mb-6">A melhor coleção de moda elegante e sofisticada de Moçambique para você.</p>
          <div className="flex gap-4">
            <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition">
              <Instagram className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition">
              <Facebook className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-4">Produtos</h4>
          <ul className="space-y-2 text-white/80">
            <li><Link href="#" className="hover:text-white transition">Roupas</Link></li>
            <li><Link href="#" className="hover:text-white transition">Acessórios</Link></li>
            <li><Link href="#" className="hover:text-white transition">Sapatos</Link></li>
            <li><Link href="#" className="hover:text-white transition">Coleções</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Informações</h4>
          <ul className="space-y-2 text-white/80">
            <li><Link href="#" className="hover:text-white transition">Sobre Nós</Link></li>
            <li><Link href="#" className="hover:text-white transition">Contato</Link></li>
            <li><Link href="#" className="hover:text-white transition">Política de Privacidade</Link></li>
            <li><Link href="#" className="hover:text-white transition">Termos de Uso</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Contato</h4>
          <ul className="space-y-3 text-white/80">
            <li className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <a href="tel:+258879992762" className="hover:text-white transition font-semibold">
                +258 879 992 762
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <a href="tel:847052762" className="hover:text-white transition font-semibold">
                847 052 762
              </a>
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.462 0-2.83-.356-4.08-1.032l-.293-.167-3.03.797.814-2.972-.192-.307C2.704 4.649 2.084 3.128 2.084 1.532 2.084.771 2.717 0 3.552 0 10.963 0 17 6.04 17 13.45c0 .834-.768 1.467-1.602 1.467-.503 0-.934-.278-1.2-.684-.267.406-.697.684-1.2.684-.834 0-1.602-.633-1.602-1.467 0-7.41-6.037-13.45-13.448-13.45z"/>
              </svg>
              <a href="https://wa.me/258879992762" target="_blank" rel="noopener noreferrer" className="hover:text-white transition font-semibold">
                WhatsApp
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
              <a href="https://maps.google.com/?q=Khongolote,Maputo,Mozambique" target="_blank" rel="noopener noreferrer" className="hover:text-white transition font-semibold">
                Khongolote, Maputo
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 py-6 text-center text-white/70 text-sm">
        <p>&copy; 2024 Shells Fashion Elegance Moçambique. Todos os direitos reservados. | Maputo, Khongolote</p>
      </div>
    </footer>
  );
}
