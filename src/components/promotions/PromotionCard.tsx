import { Calendar, Tag, Car, ShoppingCart } from 'lucide-react';
import { Promotion } from '@/types/promotion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface PromotionCardProps {
  promotion: Promotion;
  showAddToCart?: boolean;
}

export const PromotionCard = ({ promotion, showAddToCart = false }: PromotionCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(promotion);
    toast({
      title: '¡Agregado al carrito!',
      description: `${promotion.titulo} se agregó correctamente.`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'short'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <Card className="group overflow-hidden card-gradient border-border hover:border-primary/50 transition-all duration-300 hover:glow-effect">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={promotion.imagen || '/placeholder.svg'}
          alt={promotion.titulo}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
        
        {promotion.descuento && (
          <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground font-bold text-sm px-3 py-1">
            {promotion.descuento} OFF
          </Badge>
        )}
      </div>

      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-2">
          {promotion.marca_auto && (
            <Badge variant="secondary" className="text-xs">
              <Car className="w-3 h-3 mr-1" />
              {promotion.marca_auto}
            </Badge>
          )}
        </div>

        <h3 className="font-heading text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {promotion.titulo}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {promotion.descripcion}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(promotion.fecha_inicio)} - {formatDate(promotion.fecha_termino)}</span>
          </div>

          <div className="flex items-center gap-1">
            <Tag className="w-4 h-4 text-primary" />
            <span className="font-heading text-xl font-bold text-primary">
              {formatPrice(promotion.precio)}
            </span>
          </div>
        </div>

        {showAddToCart && (
          <Button onClick={handleAddToCart} className="w-full" variant="default">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Agregar al carrito
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
