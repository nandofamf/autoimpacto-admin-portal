import { useActivePromotions } from '@/hooks/usePromotions';
import { PromotionCard } from './PromotionCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export const PromotionsCarousel = () => {
  const { promotions, loading } = useActivePromotions();

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (promotions.length === 0) {
    return null;
  }

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {promotions.map((promotion) => (
          <CarouselItem key={promotion.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
            <PromotionCard promotion={promotion} showAddToCart />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0 -translate-x-1/2" />
      <CarouselNext className="right-0 translate-x-1/2" />
    </Carousel>
  );
};
