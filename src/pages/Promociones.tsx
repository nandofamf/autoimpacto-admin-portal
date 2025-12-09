import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { PromotionCard } from '@/components/promotions/PromotionCard';
import { useActivePromotions } from '@/hooks/usePromotions';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Promociones = () => {
  const { promotions, loading } = useActivePromotions();
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('all');

  const brands = [...new Set(promotions.map(p => p.marca_auto).filter(Boolean))];

  const filteredPromotions = promotions.filter(promo => {
    const matchesSearch = promo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          promo.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = brandFilter === 'all' || promo.marca_auto === brandFilter;
    return matchesSearch && matchesBrand;
  });

  return (
    <Layout>
      {/* Header */}
      <section className="py-20 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Nuestras <span className="text-primary">Promociones</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Encuentra las mejores ofertas en repuestos para tu vehículo. Actualizamos nuestras 
              promociones constantemente para ofrecerte los mejores precios.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-muted/30 border-b border-border sticky top-16 md:top-20 z-40 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar promociones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            {brands.length > 0 && (
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={brandFilter} onValueChange={setBrandFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Marca de auto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las marcas</SelectItem>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Promotions Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredPromotions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPromotions.map((promotion, index) => (
                <div 
                  key={promotion.id} 
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <PromotionCard promotion={promotion} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg mb-2">
                {searchTerm || brandFilter !== 'all' 
                  ? 'No se encontraron promociones con los filtros seleccionados.'
                  : 'No hay promociones activas en este momento.'}
              </p>
              {(searchTerm || brandFilter !== 'all') && (
                <button 
                  onClick={() => { setSearchTerm(''); setBrandFilter('all'); }}
                  className="text-primary hover:underline"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Promociones;
