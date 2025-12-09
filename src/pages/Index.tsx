import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, Shield, Award } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { PromotionCard } from '@/components/promotions/PromotionCard';
import { useActivePromotions } from '@/hooks/usePromotions';
import heroBg from '@/assets/hero-bg.jpg';

const features = [
  {
    icon: Wrench,
    title: 'Repuestos de Calidad',
    description: 'Trabajamos con diferentes calidades para adaptarnos a tu presupuesto y necesidades.'
  },
  {
    icon: Shield,
    title: 'Garantía',
    description: 'Todos nuestros productos cuentan con garantía de calidad.'
  },
  {
    icon: Award,
    title: 'Asesoría Experta',
    description: 'Nuestro equipo te guía para encontrar el repuesto ideal para tu vehículo.'
  }
];

const Index = () => {
  const { promotions, loading } = useActivePromotions();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 hero-gradient opacity-90" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl animate-fade-up">
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-4">
              <span className="text-foreground">AUTOIMPACTO</span>
              <span className="text-primary"> 3</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-2 font-heading">
              CONCEPCIÓN
            </p>
            <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-xl">
              Tu tienda de confianza para repuestos automotrices. Te asesoramos con profesionalismo 
              para encontrar la mejor opción en calidad y precio para tu vehículo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="hero" size="xl">
                <Link to="/promociones">
                  Ver Promociones
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="xl">
                <Link to="/contacto">
                  Contáctanos
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="text-center p-8 rounded-xl bg-muted/50 border border-border hover:border-primary/50 transition-all animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-2xl flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Promociones <span className="text-primary">Destacadas</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Aprovecha nuestras ofertas especiales en repuestos de calidad para tu vehículo.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : promotions.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {promotions.slice(0, 3).map((promotion) => (
                  <PromotionCard key={promotion.id} promotion={promotion} />
                ))}
              </div>
              {promotions.length > 3 && (
                <div className="text-center mt-10">
                  <Button asChild variant="outline" size="lg">
                    <Link to="/promociones">
                      Ver todas las promociones
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No hay promociones activas en este momento. ¡Vuelve pronto!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/10 border-y border-primary/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            ¿Necesitas un repuesto específico?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Contáctanos y te ayudamos a encontrar exactamente lo que necesitas para tu vehículo.
          </p>
          <Button asChild variant="hero" size="xl">
            <Link to="/contacto">
              Escríbenos ahora
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
