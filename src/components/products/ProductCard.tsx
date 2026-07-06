import { Car, ShoppingCart, PackageX } from 'lucide-react';
import { Product } from '@/types/product';
import { Promotion } from '@/types/promotion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const toCartProduct = (product: Product): Promotion => ({
  id: product.id,
  titulo: product.nombre,
  descripcion: product.descripcion,
  precio: product.precio_oferta ?? product.precio,
  descuento: '',
  marca_auto: product.marca_auto,
  fecha_inicio: '',
  fecha_termino: '',
  imagen: product.imagen,
  activo: product.activo,
});

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const outOfStock = product.stock <= 0;
  const lowStock = product.stock > 0 && product.stock <= 5;
  const discount =
    product.precio_oferta && product.precio > 0
      ? Math.round((1 - product.precio_oferta / product.precio) * 100)
      : null;

  const handleAddToCart = () => {
    addToCart(toCartProduct(product));
    toast({
      title: '¡Agregado al carrito!',
      description: `${product.nombre} se agregó correctamente.`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="group overflow-hidden card-gradient border-border hover:border-primary/50 transition-all duration-300 hover:glow-effect">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.imagen || '/placeholder.svg'}
          alt={product.nombre}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />

        {discount ? (
          <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground font-bold text-sm px-3 py-1">
            -{discount}%
          </Badge>
        ) : null}

        {outOfStock && (
          <Badge variant="secondary" className="absolute top-3 left-3 font-semibold">
            Sin stock
          </Badge>
        )}
      </div>

      <CardContent className="p-5">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            {product.categoria}
          </Badge>
          {product.marca_auto && (
            <Badge variant="outline" className="text-xs">
              <Car className="w-3 h-3 mr-1" />
              {product.marca_auto}
            </Badge>
          )}
        </div>

        <h3 className="font-heading text-xl font-bold mb-1 line-clamp-2 group-hover:text-primary transition-colors">
          {product.nombre}
        </h3>

        {product.marca_repuesto && (
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
            {product.marca_repuesto}
          </p>
        )}

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.descripcion}</p>

        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-xl font-bold text-primary">
                {formatPrice(product.precio_oferta ?? product.precio)}
              </span>
              {product.precio_oferta && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.precio)}
                </span>
              )}
            </div>
            <p
              className={`text-xs mt-1 font-medium ${
                outOfStock
                  ? 'text-destructive'
                  : lowStock
                    ? 'text-amber-500'
                    : 'text-green-500'
              }`}
            >
              {outOfStock
                ? 'Agotado'
                : lowStock
                  ? `¡Quedan solo ${product.stock}!`
                  : `En stock · ${product.stock} unidades`}
            </p>
          </div>
        </div>

        <Button onClick={handleAddToCart} className="w-full" disabled={outOfStock}>
          {outOfStock ? (
            <>
              <PackageX className="w-4 h-4 mr-2" />
              Sin stock
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Agregar al carrito
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
