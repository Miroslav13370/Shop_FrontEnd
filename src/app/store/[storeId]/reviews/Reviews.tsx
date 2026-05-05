'use client';
import { Heading } from '@/src/components/ui/Heading';
import { DataTable } from '@/src/components/ui/data-loading/DataTable';
import DataTableLoading from '@/src/components/ui/data-loading/DataTableLoading';
import { ReviewsColumn } from '@/src/components/ui/data-loading/ReviewsColumn';
import useGetReviews from '@/src/hooks/queries/reviews/useGetReviews';

const Reviews = () => {
  const { reviewsListData, isLoadingReviews } = useGetReviews();
  return (
    <div className="p-5">
      {reviewsListData && !isLoadingReviews ? (
        <>
          <div className="mb-4 flex justify-between items-center">
            <Heading
              title={`Отзывы (${reviewsListData?.length ? reviewsListData?.length : '0'})`}
              description="Все отзывы нашего магазина"
            />
          </div>

          <DataTable columns={ReviewsColumn} data={reviewsListData} />
        </>
      ) : (
        <DataTableLoading />
      )}
    </div>
  );
};

export default Reviews;
