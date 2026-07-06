import { useState, useEffect } from 'react';
import { ref, onValue, push, set, update, remove } from 'firebase/database';
import { database } from '@/lib/firebase';
import { Product } from '@/types/product';
import { sampleProducts } from '@/data/sampleProducts';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productsRef = ref(database, 'productos');

    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productsList = Object.entries(data).map(([id, product]) => ({
          id,
          precio_oferta: null,
          ...(product as Omit<Product, 'id'>),
        }));
        setProducts(productsList);
      } else {
        setProducts([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addProduct = async (product: Omit<Product, 'id'>) => {
    const productsRef = ref(database, 'productos');
    const newRef = push(productsRef);
    await set(newRef, product);
    return newRef.key;
  };

  const updateProduct = async (id: string, product: Partial<Product>) => {
    const productRef = ref(database, `productos/${id}`);
    await update(productRef, product);
  };

  const deleteProduct = async (id: string) => {
    const productRef = ref(database, `productos/${id}`);
    await remove(productRef);
  };

  const toggleActive = async (id: string, currentActive: boolean) => {
    await updateProduct(id, { activo: !currentActive });
  };

  const seedProducts = async () => {
    for (const product of sampleProducts) {
      await addProduct(product);
    }
  };

  return { products, loading, addProduct, updateProduct, deleteProduct, toggleActive, seedProducts };
};

export const useActiveProducts = () => {
  const { products, loading } = useProducts();
  return { products: products.filter((p) => p.activo), loading };
};
