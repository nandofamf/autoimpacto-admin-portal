import { Link } from 'react-router-dom';
import { Wrench, MapPin, Phone, Instagram } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Wrench className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <span className="font-heading text-xl font-bold">AUTOIMPACTO</span>
                <span className="font-heading text-xl font-bold text-primary ml-1">3</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Tu tienda de confianza para repuestos automotrices de calidad en Concepción.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Navegación</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Inicio
              </Link>
              <Link to="/promociones" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Promociones
              </Link>
              <Link to="/nosotros" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Nosotros
              </Link>
              <Link to="/contacto" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Contacto
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Contacto</h4>
            <div className="flex flex-col gap-3">
              <a 
                href="https://maps.google.com/?q=Maipú+111+Concepción+Chile"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Maipú 111, Concepción</span>
              </a>
              <a 
                href="tel:+56926095799"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>+56 9 2609 5799</span>
              </a>
              <a 
                href="https://instagram.com/autoimpacto3"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <Instagram className="w-4 h-4 shrink-0" />
                <span>@autoimpacto3</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} AUTOIMPACTO 3 CONCEPCION. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
