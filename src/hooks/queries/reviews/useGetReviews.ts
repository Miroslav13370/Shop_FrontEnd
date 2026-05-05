import { useParams } from 'next/navigation';

import { useGetReviewByStoreIdQuery } from '@/src/api/review/reviewApi';

const useGetReviews = () => {
  const params = useParams<{ storeId: string }>();
  const { data: reviewsListData, isLoading: isLoadingReviews } = useGetReviewByStoreIdQuery(
    params.storeId,
  );

  return { reviewsListData, isLoadingReviews };
};

export default useGetReviews;
