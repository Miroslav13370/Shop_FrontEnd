import { useParams } from 'next/navigation';
import { toast } from 'sonner';

import { useCreateReviewMutation } from '@/src/api/review/reviewApi';
import { IReviewInput } from '@/src/types/review.interface';

const useCreateReview = (storeId: string) => {
  const params = useParams<{ id: string }>();

  const [createReviewMutate, { isLoading: isLoadingCreateReview }] = useCreateReviewMutation();

  const createReview = async (body: IReviewInput) => {
    try {
      await createReviewMutate({ body, productId: params.id, storeId }).unwrap();
      toast.success('Отзыв успешно создан');
    } catch {
      toast.error('Ошибка при создании Отзыва');
    }
  };

  return { createReview, isLoadingCreateReview };
};

export default useCreateReview;
