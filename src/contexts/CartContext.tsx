import { createContext, useContext, useState, ReactNode } from 'react';
import { Promotion } from '@/types/promotion';

interface CartItem {
  promotion: Promotion;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (promotion: Promotion) => void;
  removeFromCart: (promotionId: string) => void;
  updateQuantity: (promotionId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (promotion: Promotion) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.promotion.id === promotion.id);
      if (existing) {
        return prev.map((item) =>
          item.promotion.id === promotion.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { promotion, quantity: 1 }];
    });
  };

  const removeFromCart = (promotionId: string) => {
    setItems((prev) => prev.filter((item) => item.promotion.id !== promotionId));
  };

  const updateQuantity = (promotionId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(promotionId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.promotion.id === promotionId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.promotion.precio * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
