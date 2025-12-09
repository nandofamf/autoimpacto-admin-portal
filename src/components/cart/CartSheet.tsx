import { ShoppingCart, Trash2, Plus, Minus, Send } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';

export const CartSheet = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [open, setOpen] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsAppCheckout = () => {
    const phoneNumber = '56926095799';
    
    let message = '¡Hola! Me gustaría comprar los siguientes productos:\n\n';
    
    items.forEach((item) => {
      message += `• ${item.promotion.titulo} x${item.quantity} - ${formatPrice(item.promotion.precio * item.quantity)}\n`;
    });
    
    message += `\n*Total: ${formatPrice(totalPrice)}*`;
    message += '\n\n¿Podrían confirmar disponibilidad?';
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Carrito de Compras
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Tu carrito está vacío</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto py-4 space-y-4">
              {items.map((item) => (
                <div key={item.promotion.id} className="flex gap-3 p-3 rounded-lg bg-muted/50">
                  <img
                    src={item.promotion.imagen || '/placeholder.svg'}
                    alt={item.promotion.titulo}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-1">{item.promotion.titulo}</h4>
                    <p className="text-primary font-bold text-sm">
                      {formatPrice(item.promotion.precio)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-7 h-7"
                        onClick={() => updateQuantity(item.promotion.id, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-7 h-7"
                        onClick={() => updateQuantity(item.promotion.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-7 h-7 ml-auto text-destructive hover:text-destructive"
                        onClick={() => removeFromCart(item.promotion.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <Separator />
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">{formatPrice(totalPrice)}</span>
              </div>
              
              <SheetFooter className="flex-col gap-2 sm:flex-col">
                <Button 
                  onClick={handleWhatsAppCheckout} 
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white"
                  size="lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Comprar por WhatsApp
                </Button>
                <Button variant="outline" onClick={clearCart} className="w-full">
                  Vaciar carrito
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
