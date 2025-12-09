import { Star, Quote } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';

const reviews = [
  {
    name: 'Carlos M.',
    text: 'Me gustó mucho que trabajen las cosas en diferentes calidades, te asesoran de buena forma y con paciencia.',
    rating: 5
  },
  {
    name: 'Andrea P.',
    text: 'Productos de buena calidad y precios justos. Lo único que mi pedido demoró un día más de lo esperado, pero volvería sin dudarlo.',
    rating: 4
  },
  {
    name: 'Roberto S.',
    text: 'Un servicio de primera, se agradece el profesionalismo de los muchachos.',
    rating: 5
  },
  {
    name: 'María L.',
    text: 'Excelente atención, me ayudaron a encontrar un repuesto difícil de conseguir para mi auto. Muy recomendados.',
    rating: 5
  }
];

const Nosotros = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="py-20 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Sobre <span className="text-primary">Nosotros</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Conoce más sobre AUTOIMPACTO 3 CONCEPCION y nuestro compromiso con la calidad.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-heading text-3xl font-bold mb-6">
                  Tu tienda de repuestos de <span className="text-primary">confianza</span>
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    En <strong className="text-foreground">AUTOIMPACTO 3 CONCEPCION</strong> nos especializamos 
                    en repuestos automotrices para todo tipo de vehículos. Con años de experiencia en el rubro, 
                    hemos construido una reputación basada en la calidad de nuestros productos y la excelencia 
                    en el servicio al cliente.
                  </p>
                  <p>
                    Trabajamos con diferentes calidades de productos para adaptarnos a tu presupuesto y 
                    necesidades, siempre asesorándote de forma honesta y profesional para que tomes la 
                    mejor decisión para tu vehículo.
                  </p>
                  <p>
                    Nuestro equipo está capacitado para ayudarte a encontrar el repuesto exacto que necesitas, 
                    ya sea para mantenimiento preventivo o reparaciones específicas.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="font-heading text-6xl font-bold text-primary mb-2">+10</div>
                    <p className="text-muted-foreground">Años de experiencia</p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">Clientes satisfechos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            Nuestros <span className="text-primary">Valores</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { title: 'Honestidad', desc: 'Te asesoramos con transparencia sobre la mejor opción para tu vehículo y presupuesto.' },
              { title: 'Calidad', desc: 'Trabajamos solo con proveedores confiables para garantizar productos de excelencia.' },
              { title: 'Compromiso', desc: 'Nos esforzamos por superar tus expectativas en cada visita.' }
            ].map((value, index) => (
              <div 
                key={value.title}
                className="text-center p-6 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="font-heading text-xl font-bold text-primary">{index + 1}</span>
                </div>
                <h3 className="font-heading text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Lo que dicen nuestros <span className="text-primary">clientes</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestra mayor recompensa.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {reviews.map((review, index) => (
              <Card 
                key={index} 
                className="card-gradient animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-primary/30 mb-4" />
                  <p className="text-foreground/90 mb-4 italic">"{review.text}"</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{review.name}</span>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                      {[...Array(5 - review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-muted" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Nosotros;
