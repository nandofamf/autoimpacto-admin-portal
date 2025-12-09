import { useState } from 'react';
import { MapPin, Phone, Instagram, Send, Clock } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Contacto = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: '¡Mensaje enviado!',
      description: 'Nos pondremos en contacto contigo pronto.',
    });

    setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
    setSending(false);
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-20 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              <span className="text-primary">Contáctanos</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              ¿Tienes alguna consulta o necesitas un repuesto específico? 
              Estamos aquí para ayudarte.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-heading text-2xl font-bold mb-6">
                Información de Contacto
              </h2>

              <div className="space-y-4 mb-8">
                <Card className="card-gradient">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Dirección</h3>
                      <a 
                        href="https://maps.google.com/?q=Maipú+111+Concepción+Chile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        Maipú 111, 4030000 Concepción, Bío Bío
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-gradient">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Teléfono</h3>
                      <a 
                        href="tel:+56926095799"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        +56 9 2609 5799
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-gradient">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                      <Instagram className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Instagram</h3>
                      <a 
                        href="https://instagram.com/autoimpacto3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        @autoimpacto3
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-gradient">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Horario</h3>
                      <p className="text-muted-foreground">
                        Lunes a Viernes: 9:00 - 19:00<br />
                        Sábado: 9:00 - 14:00
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden border border-border h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3114.5!2d-73.0500!3d-36.8270!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9669b5e0d8e1f5b1%3A0x0!2sMaip%C3%BA%20111%2C%20Concepci%C3%B3n%2C%20B%C3%ADo%20B%C3%ADo%2C%20Chile!5e0!3m2!1ses!2scl!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-heading text-2xl font-bold mb-6">
                Envíanos un Mensaje
              </h2>

              <Card className="card-gradient">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium mb-2">
                        Nombre *
                      </label>
                      <Input
                        id="nombre"
                        placeholder="Tu nombre"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Correo electrónico *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="telefono" className="block text-sm font-medium mb-2">
                        Teléfono (opcional)
                      </label>
                      <Input
                        id="telefono"
                        type="tel"
                        placeholder="+56 9 1234 5678"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      />
                    </div>

                    <div>
                      <label htmlFor="mensaje" className="block text-sm font-medium mb-2">
                        Mensaje *
                      </label>
                      <Textarea
                        id="mensaje"
                        placeholder="Cuéntanos qué repuesto necesitas o tu consulta..."
                        rows={5}
                        value={formData.mensaje}
                        onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                        required
                      />
                    </div>

                    <Button type="submit" variant="hero" size="lg" className="w-full" disabled={sending}>
                      {sending ? (
                        <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          Enviar mensaje
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacto;
