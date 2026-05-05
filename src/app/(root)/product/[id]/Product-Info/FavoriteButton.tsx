import { Heart } from 'lucide-react';

import { useGetProfileQuery, useToggleFavoriteMutation } from '@/src/api/user/userApi';
import { Button } from '@/src/components/ui/button';
import { IProduct } from '@/src/types/product.interface';

type Props = {
  product: IProduct;
};
export const FavoriteButton = ({ product }: Props) => {
  const { data: profile, isLoading } = useGetProfileQuery();

  const [toggleFavorite] = useToggleFavoriteMutation();

  if (!profile) return null;

  const ExistsFavorite = profile.favorites.some((productExists) => productExists.id === product.id);

  return (
    <div>
      <Button
        disabled={isLoading}
        onClick={() => toggleFavorite(product.id)}
        variant="secondary"
        className="h-10"
      >
        {ExistsFavorite ? <Heart color="#FF0000" className="fill-red-500" /> : <Heart />}
      </Button>
    </div>
  );
};
