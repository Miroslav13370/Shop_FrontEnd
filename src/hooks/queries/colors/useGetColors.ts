import { useParams } from 'next/navigation';

import { useGetColorByStoreIdQuery } from '@/src/api/color/colorApi';

const useGetColor = () => {
  const params = useParams<{ storeId: string }>();
  const { data: colorListData, isLoading: isLoadingColor } = useGetColorByStoreIdQuery(
    params.storeId,
  );

  return { colorListData, isLoadingColor };
};

export default useGetColor;
