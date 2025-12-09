import { useState } from 'react';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Promotion } from '@/types/promotion';
import { usePromotions } from '@/hooks/usePromotions';
import { useToast } from '@/hooks/use-toast';

interface PromotionFormProps {
  promotion?: Promotion | null;
  onClose: () => void;
}

export const PromotionForm = ({ promotion, onClose }: PromotionFormProps) => {
  const { addPromotion, updatePromotion } = usePromotions();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    titulo: promotion?.titulo || '',
    descripcion: promotion?.descripcion || '',
    precio: promotion?.precio || 0,
    descuento: promotion?.descuento || '',
    marca_auto: promotion?.marca_auto || '',
    fecha_inicio: promotion?.fecha_inicio || new Date().toISOString().split('T')[0],
    fecha_termino: promotion?.fecha_termino || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    imagen: promotion?.imagen || '',
    activo: promotion?.activo ?? true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (promotion) {
        await updatePromotion(promotion.id, formData);
        toast({
          title: 'Promoción actualizada',
          description: 'Los cambios han sido guardados correctamente.'
        });
      } else {
        await addPromotion(formData);
        toast({
          title: 'Promoción creada',
          description: 'La nueva promoción ha sido creada correctamente.'
        });
      }
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Ocurrió un error al guardar la promoción.',
        variant: 'destructive'
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
              {promotion ? 'Editar promoción' : 'Nueva promoción'}
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
                <label htmlFor="titulo" className="block text-sm font-medium mb-2">
                  Título *
                </label>
                <Input
                  id="titulo"
                  placeholder="Ej: Oferta pastillas de freno"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="descripcion" className="block text-sm font-medium mb-2">
                  Descripción *
                </label>
                <Textarea
                  id="descripcion"
                  placeholder="Describe la promoción..."
                  rows={3}
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                  <label htmlFor="descuento" className="block text-sm font-medium mb-2">
                    Descuento
                  </label>
                  <Input
                    id="descuento"
                    placeholder="Ej: 20%"
                    value={formData.descuento}
                    onChange={(e) => setFormData({ ...formData, descuento: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="marca_auto" className="block text-sm font-medium mb-2">
                  Marca de auto
                </label>
                <Input
                  id="marca_auto"
                  placeholder="Ej: Hyundai, Toyota, Kia..."
                  value={formData.marca_auto}
                  onChange={(e) => setFormData({ ...formData, marca_auto: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient mb-6">
            <CardHeader>
              <CardTitle>Fechas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fecha_inicio" className="block text-sm font-medium mb-2">
                    Fecha inicio *
                  </label>
                  <Input
                    id="fecha_inicio"
                    type="date"
                    value={formData.fecha_inicio}
                    onChange={(e) => setFormData({ ...formData, fecha_inicio: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="fecha_termino" className="block text-sm font-medium mb-2">
                    Fecha término *
                  </label>
                  <Input
                    id="fecha_termino"
                    type="date"
                    value={formData.fecha_termino}
                    onChange={(e) => setFormData({ ...formData, fecha_termino: e.target.value })}
                    required
                  />
                </div>
              </div>
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
                  type="url"
                  placeholder="https://ejemplo.com/imagen.jpg"
                  value={formData.imagen}
                  onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                />
              </div>

              {formData.imagen && (
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
              )}

              {!formData.imagen && (
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
                  <p className="font-medium">Promoción activa</p>
                  <p className="text-sm text-muted-foreground">
                    Las promociones activas son visibles en el sitio público
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
                  {promotion ? 'Guardar cambios' : 'Crear promoción'}
                </>
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};
