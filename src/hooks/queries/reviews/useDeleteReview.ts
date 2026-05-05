import { toast } from 'sonner';

import { useDeleteReviewMutation } from '@/src/api/review/reviewApi';

const useDeleteReview = () => {
  const [deleteReviewMutate, { isLoading: isLoadingDeleteReview }] = useDeleteReviewMutation();

  const deleteReview = async (reviewId: string) => {
    try {
      await deleteReviewMutate(reviewId).unwrap();
      toast.success('Отзыв успешно удален');
    } catch {
      toast.error('Ошибка при удалении Отзыва');
    }
  };

  return { deleteReview, isLoadingDeleteReview };
};

export default useDeleteReview;
