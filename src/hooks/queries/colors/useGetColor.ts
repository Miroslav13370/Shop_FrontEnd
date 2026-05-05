import { useParams } from 'next/navigation';

import { useGetColorByIdQuery } from '@/src/api/color/colorApi';

const useGetColor = () => {
  const { storeId, colorId } = useParams<{ storeId: string; colorId: string }>();
  const { data: colorData, isLoading: isLoadingColor } = useGetColorByIdQuery({
    colorId,
    storeId,
  });

  return { colorData, isLoadingColor };
};

export default useGetColor;
