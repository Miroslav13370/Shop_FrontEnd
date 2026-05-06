import { Plus, TrashIcon } from 'lucide-react';
import Image from 'next/image';
import { Rating } from 'react-simple-star-rating';

import { useGetProfileQuery } from '@/src/api/user/userApi';
import { Heading } from '@/src/components/ui/Heading';
import { Button } from '@/src/components/ui/button';
import { ConfirmModals } from '@/src/components/ui/modals/ConfirmModals';
import { ReviewModal } from '@/src/components/ui/modals/ReviewModal';
import useDeleteReview from '@/src/hooks/queries/reviews/useDeleteReview';
import { IProduct } from '@/src/types/product.interface';
import { returnImagesUrl } from '@/src/utils/url/returnImagesUrl';

type Props = {
  product: IProduct | undefined;
};
export const ProductReviews = ({ product }: Props) => {
  const { data: user } = useGetProfileQuery();

  const { deleteReview, isLoadingDeleteReview } = useDeleteReview();

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between">
        <Heading title="Отзывы" className="font-bold" />
        {user && product?.storeId ? (
          <ReviewModal storeId={product?.storeId}>
            <Button variant="ghost">
              <Plus />
              Добавить отзыв
            </Button>
          </ReviewModal>
        ) : null}
      </div>
      <div className="flex flex-row gap-5 flex-wrap lg:flex-nowrap lg:overflow-auto p-4 pl-0">
        {product?.reviews.length ? (
          product?.reviews?.map((review) => (
            <div
              key={review.id}
              className="p-2 border min-w-70 rounded-md shadow-md flex flex-col gap-2 pl-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 mt-2">
                  <Image
                    src={returnImagesUrl(review.user.picture)}
                    alt={review.user.name}
                    width={1000}
                    height={1000}
                    className="w-10 h-10 rounded-full"
                  />
                  <p>{review.user.name}</p>
                </div>
                {user?.id === review.user.id ? (
                  <ConfirmModals handlerFunc={() => deleteReview(review.id)}>
                    <Button variant="ghost" disabled={isLoadingDeleteReview}>
                      <TrashIcon />
                    </Button>
                  </ConfirmModals>
                ) : null}
              </div>
              <div className="**:inline-block">
                <Rating initialValue={+review.rating} readonly size={25} />
              </div>
              <p>{review.text}</p>
            </div>
          ))
        ) : (
          <p>У этого товара нету отзывов</p>
        )}
      </div>
    </div>
  );
};
