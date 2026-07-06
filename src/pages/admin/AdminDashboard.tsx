import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  LogOut,
  Wrench,
  Menu,
  X,
  PackagePlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { usePromotions } from '@/hooks/usePromotions';
import { useProducts } from '@/hooks/useProducts';
import { PromotionForm } from '@/components/admin/PromotionForm';
import { ProductForm } from '@/components/admin/ProductForm';
import { Promotion } from '@/types/promotion';
import { Product } from '@/types/product';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { promotions, loading, deletePromotion, toggleActive } = usePromotions();
  const {
    products,
    loading: loadingProducts,
    deleteProduct,
    toggleActive: toggleProductActive,
    seedProducts,
  } = useProducts();
  const { toast } = useToast();

  const [showForm, setShowForm] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin');
  };

  const handleEdit = (promotion: Promotion) => {
    setEditingPromotion(promotion);
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deletePromotion(deleteId);
      toast({
        title: 'Promoción eliminada',
        description: 'La promoción ha sido eliminada correctamente.'
      });
      setDeleteId(null);
    }
  };

  const handleToggleActive = async (id: string, activo: boolean) => {
    await toggleActive(id, activo);
    toast({
      title: activo ? 'Promoción desactivada' : 'Promoción activada',
      description: activo ? 'La promoción ya no será visible.' : 'La promoción ahora está visible.'
    });
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = async () => {
    if (deleteProductId) {
      await deleteProduct(deleteProductId);
      toast({
        title: 'Producto eliminado',
        description: 'El producto ha sido eliminado correctamente.'
      });
      setDeleteProductId(null);
    }
  };

  const handleToggleProductActive = async (id: string, activo: boolean) => {
    await toggleProductActive(id, activo);
    toast({
      title: activo ? 'Producto desactivado' : 'Producto activado',
      description: activo ? 'El producto ya no será visible en el catálogo.' : 'El producto ahora está visible en el catálogo.'
    });
  };

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await seedProducts();
      toast({
        title: 'Productos de ejemplo cargados',
        description: 'Se agregaron 12 productos de ejemplo al catálogo.'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los productos de ejemplo.',
        variant: 'destructive'
      });
    }
    setSeeding(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CL');
  };

  const stockBadge = (stock: number) => {
    if (stock <= 0) {
      return <Badge variant="destructive">Sin stock</Badge>;
    }
    if (stock <= 5) {
      return <Badge className="bg-amber-500/15 text-amber-500 hover:bg-amber-500/15">Stock bajo: {stock}</Badge>;
    }
    return <Badge variant="secondary">Stock: {stock}</Badge>;
  };

  if (showForm) {
    return (
      <PromotionForm
        promotion={editingPromotion}
        onClose={() => {
          setShowForm(false);
          setEditingPromotion(null);
        }}
      />
    );
  }

  if (showProductForm) {
    return (
      <ProductForm
        product={editingProduct}
        onClose={() => {
          setShowProductForm(false);
          setEditingProduct(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Wrench className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-heading text-lg font-bold">AUTOIMPACTO 3</h1>
                <p className="text-xs text-muted-foreground">Panel de administración</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{user?.email}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar sesión
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">{user?.email}</p>
              <Button variant="outline" size="sm" onClick={handleLogout} className="w-full">
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar sesión
              </Button>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="productos">
          <TabsList className="mb-8">
            <TabsTrigger value="productos">Productos</TabsTrigger>
            <TabsTrigger value="promociones">Promociones</TabsTrigger>
          </TabsList>

          {/* ================= PRODUCTOS ================= */}
          <TabsContent value="productos">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="card-gradient">
                <CardContent className="p-4">
                  <p className="text-muted-foreground text-sm">Total productos</p>
                  <p className="font-heading text-3xl font-bold">{products.length}</p>
                </CardContent>
              </Card>
              <Card className="card-gradient">
                <CardContent className="p-4">
                  <p className="text-muted-foreground text-sm">Activos</p>
                  <p className="font-heading text-3xl font-bold text-green-500">
                    {products.filter(p => p.activo).length}
                  </p>
                </CardContent>
              </Card>
              <Card className="card-gradient">
                <CardContent className="p-4">
                  <p className="text-muted-foreground text-sm">Stock bajo</p>
                  <p className="font-heading text-3xl font-bold text-amber-500">
                    {products.filter(p => p.stock > 0 && p.stock <= 5).length}
                  </p>
                </CardContent>
              </Card>
              <Card className="card-gradient">
                <CardContent className="p-4">
                  <p className="text-muted-foreground text-sm">Sin stock</p>
                  <p className="font-heading text-3xl font-bold text-destructive">
                    {products.filter(p => p.stock <= 0).length}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl font-bold">Productos</h2>
              <Button onClick={() => setShowProductForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Nuevo producto
              </Button>
            </div>

            {loadingProducts ? (
              <div className="flex justify-center py-12">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : products.length > 0 ? (
              <div className="grid gap-4">
                {products.map((product) => (
                  <Card key={product.id} className="card-gradient overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-48 h-32 md:h-auto shrink-0">
                          <img
                            src={product.imagen || '/placeholder.svg'}
                            alt={product.nombre}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 p-4">
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-heading text-lg font-bold">{product.nombre}</h3>
                              <Badge variant={product.activo ? 'success' : 'secondary'}>
                                {product.activo ? 'Activo' : 'Inactivo'}
                              </Badge>
                              {stockBadge(product.stock)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleToggleProductActive(product.id, product.activo)}
                                title={product.activo ? 'Desactivar' : 'Activar'}
                              >
                                {product.activo ? (
                                  <ToggleRight className="w-5 h-5 text-green-500" />
                                ) : (
                                  <ToggleLeft className="w-5 h-5" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditProduct(product)}
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setDeleteProductId(product.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                            {product.descripcion}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <span className="font-semibold text-primary">
                              {formatPrice(product.precio_oferta ?? product.precio)}
                            </span>
                            {product.precio_oferta && (
                              <span className="text-muted-foreground line-through">
                                {formatPrice(product.precio)}
                              </span>
                            )}
                            <Badge variant="secondary">{product.categoria}</Badge>
                            {product.marca_repuesto && (
                              <span className="text-muted-foreground">{product.marca_repuesto}</span>
                            )}
                            {product.marca_auto && (
                              <span className="text-muted-foreground">{product.marca_auto}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="card-gradient">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    No hay productos en el catálogo aún. Crea el primero o carga los productos de ejemplo.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={() => setShowProductForm(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Crear primer producto
                    </Button>
                    <Button variant="outline" onClick={handleSeed} disabled={seeding}>
                      {seeding ? (
                        <div className="w-4 h-4 mr-2 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <PackagePlus className="w-4 h-4 mr-2" />
                      )}
                      Cargar 12 productos de ejemplo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* ================= PROMOCIONES ================= */}
          <TabsContent value="promociones">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="card-gradient">
                <CardContent className="p-4">
                  <p className="text-muted-foreground text-sm">Total promociones</p>
                  <p className="font-heading text-3xl font-bold">{promotions.length}</p>
                </CardContent>
              </Card>
              <Card className="card-gradient">
                <CardContent className="p-4">
                  <p className="text-muted-foreground text-sm">Activas</p>
                  <p className="font-heading text-3xl font-bold text-green-500">
                    {promotions.filter(p => p.activo).length}
                  </p>
                </CardContent>
              </Card>
              <Card className="card-gradient">
                <CardContent className="p-4">
                  <p className="text-muted-foreground text-sm">Inactivas</p>
                  <p className="font-heading text-3xl font-bold text-muted-foreground">
                    {promotions.filter(p => !p.activo).length}
                  </p>
                </CardContent>
              </Card>
              <Card className="card-gradient">
                <CardContent className="p-4">
                  <p className="text-muted-foreground text-sm">Vigentes</p>
                  <p className="font-heading text-3xl font-bold text-primary">
                    {promotions.filter(p => {
                      if (!p.activo) return false;
                      const now = new Date();
                      return now >= new Date(p.fecha_inicio) && now <= new Date(p.fecha_termino);
                    }).length}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl font-bold">Promociones</h2>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Nueva promoción
              </Button>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : promotions.length > 0 ? (
              <div className="grid gap-4">
                {promotions.map((promotion) => (
                  <Card key={promotion.id} className="card-gradient overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        {/* Image */}
                        <div className="w-full md:w-48 h-32 md:h-auto shrink-0">
                          <img
                            src={promotion.imagen || '/placeholder.svg'}
                            alt={promotion.titulo}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-4">
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-heading text-lg font-bold">{promotion.titulo}</h3>
                              <Badge variant={promotion.activo ? 'success' : 'secondary'}>
                                {promotion.activo ? 'Activa' : 'Inactiva'}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleToggleActive(promotion.id, promotion.activo)}
                                title={promotion.activo ? 'Desactivar' : 'Activar'}
                              >
                                {promotion.activo ? (
                                  <ToggleRight className="w-5 h-5 text-green-500" />
                                ) : (
                                  <ToggleLeft className="w-5 h-5" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEdit(promotion)}
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setDeleteId(promotion.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                            {promotion.descripcion}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <span className="font-semibold text-primary">
                              {formatPrice(promotion.precio)}
                            </span>
                            {promotion.descuento && (
                              <Badge variant="default">{promotion.descuento} OFF</Badge>
                            )}
                            {promotion.marca_auto && (
                              <Badge variant="secondary">{promotion.marca_auto}</Badge>
                            )}
                            <span className="text-muted-foreground">
                              {formatDate(promotion.fecha_inicio)} - {formatDate(promotion.fecha_termino)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="card-gradient">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">No hay promociones creadas aún.</p>
                  <Button onClick={() => setShowForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Crear primera promoción
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Delete Promotion Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar promoción?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. La promoción será eliminada permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Product Confirmation */}
      <AlertDialog open={!!deleteProductId} onOpenChange={() => setDeleteProductId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El producto será eliminado permanentemente del catálogo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProduct} className="bg-destructive hover:bg-destructive/90">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
