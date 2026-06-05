import { Phone, MapPin } from 'lucide-react';

export function ContactInfo() {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="font-serif text-2xl font-bold mb-6">Entre em Contato</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* WhatsApp */}
        <a
          href="https://wa.me/258879992762"
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-lg hover:shadow-lg hover:scale-105 transition-all group"
        >
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
            </svg>
            <h4 className="font-bold text-green-900">WhatsApp</h4>
          </div>
          <p className="text-green-700 font-semibold group-hover:translate-x-1 transition-transform">+258 879 992 762</p>
          <p className="text-sm text-green-600">Clique para abrir no WhatsApp</p>
        </a>

        {/* Call */}
        <a
          href="tel:+258879992762"
          className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg hover:shadow-lg hover:scale-105 transition-all group"
        >
          <div className="flex items-center gap-3 mb-2">
            <Phone className="w-6 h-6 text-blue-600" />
            <h4 className="font-bold text-blue-900">Telefone</h4>
          </div>
          <p className="text-blue-700 font-semibold group-hover:translate-x-1 transition-transform">+258 879 992 762</p>
          <p className="text-sm text-blue-600">Clique para ligar</p>
        </a>

        {/* Secondary Phone */}
        <a
          href="tel:847052762"
          className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-lg hover:shadow-lg hover:scale-105 transition-all group"
        >
          <div className="flex items-center gap-3 mb-2">
            <Phone className="w-6 h-6 text-purple-600" />
            <h4 className="font-bold text-purple-900">Telefone 2</h4>
          </div>
          <p className="text-purple-700 font-semibold group-hover:translate-x-1 transition-transform">847 052 762</p>
          <p className="text-sm text-purple-600">Chamada local</p>
        </a>

        {/* Location */}
        <a
          href="https://maps.google.com/?q=Khongolote,Maputo,Mozambique"
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 rounded-lg hover:shadow-lg hover:scale-105 transition-all group"
        >
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-6 h-6 text-orange-600" />
            <h4 className="font-bold text-orange-900">Localização</h4>
          </div>
          <p className="text-orange-700 font-semibold group-hover:translate-x-1 transition-transform">Khongolote, Maputo</p>
          <p className="text-sm text-orange-600">Clique para abrir no mapa</p>
        </a>
      </div>
    </div>
  );
}
