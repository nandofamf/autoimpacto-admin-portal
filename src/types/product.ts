export interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  marca_repuesto: string;
  marca_auto: string;
  precio: number;
  precio_oferta: number | null;
  stock: number;
  imagen: string;
  activo: boolean;
}

export const PRODUCT_CATEGORIES = [
  'Frenos',
  'Suspensión',
  'Motor',
  'Eléctrico y baterías',
  'Filtros y mantención',
  'Embragues y transmisión',
  'Refrigeración',
  'Carrocería',
  'Accesorios',
] as const;
