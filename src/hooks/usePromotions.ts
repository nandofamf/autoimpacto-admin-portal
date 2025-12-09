import { useState, useEffect } from 'react';
import { ref, onValue, push, set, update, remove } from 'firebase/database';
import { database } from '@/lib/firebase';
import { Promotion } from '@/types/promotion';

export const usePromotions = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const promotionsRef = ref(database, 'promociones');
    
    const unsubscribe = onValue(promotionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const promotionsList = Object.entries(data).map(([id, promo]) => ({
          id,
          ...(promo as Omit<Promotion, 'id'>)
        }));
        setPromotions(promotionsList);
      } else {
        setPromotions([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addPromotion = async (promotion: Omit<Promotion, 'id'>) => {
    const promotionsRef = ref(database, 'promociones');
    const newRef = push(promotionsRef);
    await set(newRef, promotion);
    return newRef.key;
  };

  const updatePromotion = async (id: string, promotion: Partial<Promotion>) => {
    const promotionRef = ref(database, `promociones/${id}`);
    await update(promotionRef, promotion);
  };

  const deletePromotion = async (id: string) => {
    const promotionRef = ref(database, `promociones/${id}`);
    await remove(promotionRef);
  };

  const toggleActive = async (id: string, activo: boolean) => {
    await updatePromotion(id, { activo: !activo });
  };

  return {
    promotions,
    loading,
    addPromotion,
    updatePromotion,
    deletePromotion,
    toggleActive
  };
};

export const useActivePromotions = () => {
  const { promotions, loading } = usePromotions();
  
  const activePromotions = promotions.filter(promo => {
    if (!promo.activo) return false;
    const now = new Date();
    const start = new Date(promo.fecha_inicio);
    const end = new Date(promo.fecha_termino);
    return now >= start && now <= end;
  });

  return { promotions: activePromotions, loading };
};
