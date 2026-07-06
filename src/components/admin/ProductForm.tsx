import { useState } from 'react';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Product, PRODUCT_CATEGORIES } from '@/types/product';
import { useProducts } from '@/hooks/useProducts';
import { useToast } from '@/hooks/use-toast';

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
}

export const ProductForm = ({ product, onClose }: ProductFormProps) => {
  const { addProduct, updateProduct } = useProducts();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    nombre: product?.nombre || '',
    descripcion: product?.descripcion || '',
    categoria: product?.categoria || '',
    marca_repuesto: product?.marca_repuesto || '',
    marca_auto: product?.marca_auto || '',
    precio: product?.precio || 0,
    precio_oferta: product?.precio_oferta ?? null,
    stock: product?.stock ?? 0,
    imagen: product?.imagen || '',
    activo: product?.activo ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (product) {
        await updateProduct(product.id, formData);
        toast({
          title: 'Producto actualizado',
          description: 'Los cambios han sido guardados correctamente.',
        });
      } else {
        await addProduct(formData);
        toast({
          title: 'Producto creado',
          description: 'El nuevo producto ha sido creado correctamente.',
        });
      }
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Ocurrió un error al guardar el producto.',
        variant: 'destructive',
      });
    }

    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16 gap-4">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-heading text-lg font-bold">
              {product ? 'Editar producto' : 'Nuevo producto'}
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <form onSubmit={handleSubmit}>
          <Card className="card-gradient mb-6">
            <CardHeader>
              <CardTitle>Información básica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium mb-2">
                  Nombre del producto *
                </label>
                <Input
                  id="nombre"
                  placeholder="Ej: Pastillas de freno delanteras"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="descripcion" className="block text-sm font-medium mb-2">
                  Descripción *
                </label>
                <Textarea
                  id="descripcion"
                  placeholder="Describe el producto..."
                  rows={3}
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Categoría *</label>
                  <Select
                    value={formData.categoria}
                    onValueChange={(value) => setFormData({ ...formData, categoria: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRODUCT_CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="marca_repuesto" className="block text-sm font-medium mb-2">
                    Marca del repuesto
                  </label>
                  <Input
                    id="marca_repuesto"
                    placeholder="Ej: Bosch, KYB, NGK..."
                    value={formData.marca_repuesto}
                    onChange={(e) => setFormData({ ...formData, marca_repuesto: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="marca_auto" className="block text-sm font-medium mb-2">
                  Vehículo compatible
                </label>
                <Input
                  id="marca_auto"
                  placeholder="Ej: Toyota Yaris 2014-2020, Multimarca..."
                  value={formData.marca_auto}
                  onChange={(e) => setFormData({ ...formData, marca_auto: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient mb-6">
            <CardHeader>
              <CardTitle>Precio y stock</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="precio" className="block text-sm font-medium mb-2">
                    Precio (CLP) *
                  </label>
                  <Input
                    id="precio"
                    type="number"
                    min="0"
                    placeholder="29990"
                    value={formData.precio || ''}
                    onChange={(e) => setFormData({ ...formData, precio: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="precio_oferta" className="block text-sm font-medium mb-2">
                    Precio oferta
                  </label>
                  <Input
                    id="precio_oferta"
                    type="number"
                    min="0"
                    placeholder="Opcional"
                    value={formData.precio_oferta ?? ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        precio_oferta: e.target.value ? parseInt(e.target.value) || 0 : null,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="stock" className="block text-sm font-medium mb-2">
                    Stock *
                  </label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    placeholder="10"
                    value={formData.stock === 0 ? '0' : formData.stock || ''}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Si dejas el precio oferta vacío, se muestra solo el precio normal. El stock se descuenta
                manualmente por ahora al confirmar ventas.
              </p>
            </CardContent>
          </Card>

          <Card className="card-gradient mb-6">
            <CardHeader>
              <CardTitle>Imagen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="imagen" className="block text-sm font-medium mb-2">
                  URL de imagen
                </label>
                <Input
                  id="imagen"
                  placeholder="https://ejemplo.com/imagen.jpg o /productos/disco.svg"
                  value={formData.imagen}
                  onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                />
              </div>

              {formData.imagen ? (
                <div className="rounded-lg overflow-hidden border border-border">
                  <img
                    src={formData.imagen}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-border p-8 text-center">
                  <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Ingresa una URL de imagen para ver la vista previa
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="card-gradient mb-6">
            <CardHeader>
              <CardTitle>Estado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Producto activo</p>
                  <p className="text-sm text-muted-foreground">
                    Los productos activos son visibles en el sitio público
                  </p>
                </div>
                <Switch
                  checked={formData.activo}
                  onCheckedChange={(checked) => setFormData({ ...formData, activo: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={saving}>
              {saving ? (
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {product ? 'Guardar cambios' : 'Crear producto'}
                </>
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};
